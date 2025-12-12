"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useSite } from "../context/SiteContext";
import { useSocket } from "../context/SocketContext";

const OccupancyChart = () => {
  const { selectedSiteId, fromUtc, toUtc } = useSite();
  const { occupancy } = useSocket();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState([]);
  const [lastTime, setLastTime] = useState(null);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      if (!selectedSiteId || !fromUtc) return;
      try {
        const token = localStorage.getItem("token");
        const result = await api.getOccupancy({ siteId: selectedSiteId, fromUtc, toUtc }, token);
        if (result && Array.isArray(result.buckets)) {
            const mappedData = result.buckets.map(item => ({
                time: new Date(item.utc).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                value: Math.round(item.avg || item.count || 0)
            }));
            setData(mappedData);
            if (mappedData.length > 0) {
              setLastTime(mappedData[mappedData.length - 1].time);
            }
        } else if (result && Array.isArray(result)) {
             setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch occupancy chart data", error);
      }
    };
    fetchData();
  }, [selectedSiteId, fromUtc, toUtc]);

  // Sync with live occupancy
  useEffect(() => {
    if (occupancy !== null && data.length > 0) {
        const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        
        setData(prevData => {
            const lastPoint = prevData[prevData.length - 1];
            // If the last point is less than a minute ago, update it. Otherwise push new.
            // Simplified: just update the last point to match "Live" or append if significant time gap. 
            // For this UI, users expect the graph end to match the big number card.
            // We'll replace/append the "Current" point.
            
            const newData = [...prevData];
            // Check if last point is "recent" (e.g. same minute string)
            if (lastPoint && lastPoint.time === nowTime) {
                newData[newData.length - 1] = { ...lastPoint, value: occupancy };
            } else {
                newData.push({ time: nowTime, value: occupancy });
            }
            // Keep graph from growing infinitely, maybe limit window? 
            // API returns buckets, we just append 'live'.
            setLastTime(nowTime);
            return newData;
        });
    }
  }, [occupancy]);

  if (!mounted) return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 h-80 flex items-center justify-center">Loading Chart...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Occupancy Trend</h3>
        <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full">
          Live Data
        </span>
      </div>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0d9488" // teal-600
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
            <ReferenceLine
              x={lastTime}
              stroke="#ef4444"
              strokeDasharray="3 3"
              label={{ position: 'top', value: 'LIVE', fill: '#ef4444', fontSize: 12, fontWeight: 'bold' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OccupancyChart;
