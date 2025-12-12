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

const OccupancyChart = () => {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState([
    { time: "09:00", value: 120 },
    { time: "10:00", value: 300 },
    { time: "11:00", value: 450 },
    { time: "12:00", value: 800 },
    { time: "13:00", value: 750 },
    { time: "14:00", value: 600 },
    { time: "15:00", value: 550 },
    { time: "16:00", value: 700 },
    { time: "17:00", value: 850 },
    { time: "18:00", value: 0 },
  ]);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Explicitly get token
        const result = await api.getOccupancy(token); // Pass token to API
        if (result && Array.isArray(result)) {
            // Assuming result matches { time, value } structure
            setData(result);
        } else if (result && result.data) {
            setData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch occupancy chart data", error);
      }
    };
    fetchData();
  }, []);

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
              x="17:00"
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
