"use client";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { api } from "../services/api";
import { useSite } from "../context/SiteContext";

const DemographicsChart = () => {
  const { selectedSiteId, fromUtc, toUtc } = useSite();
  const [malePercentage, setMalePercentage] = useState(55);
  const [femalePercentage, setFemalePercentage] = useState(45);
  
  const [data, setData] = useState([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      if (!selectedSiteId || !fromUtc) return;
      try {
        const token = localStorage.getItem("token");
        const result = await api.getDemographics({ siteId: selectedSiteId, fromUtc, toUtc }, token);
        // Assuming result structure { male: 55, female: 45, history: [...] }
        if (result && Array.isArray(result.buckets)) {
             // Calculate averages for Pie Chart
             const total = result.buckets.length;
             let mSum = 0, fSum = 0;
             const history = result.buckets.map(b => {
                 mSum += (b.male || 0);
                 fSum += (b.female || 0);
                 return {
                     time: new Date(b.utc).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                     male: b.male || 0,
                     female: b.female || 0
                 };
             });
             
             if (total > 0) {
                 setMalePercentage(Math.round(mSum / total));
                 setFemalePercentage(Math.round(fSum / total));
             }
             setData(history);
        } else if (result) {
            if (result.male) setMalePercentage(result.male);
            if (result.female) setFemalePercentage(result.female);
            if (result.history) setData(result.history);
        }
      } catch (error) {
        console.error("Failed to fetch demographics", error);
      }
    };
    fetchData();
  }, [selectedSiteId, fromUtc, toUtc]);

  const pieData = [
    { name: "Male", value: malePercentage, fill: "#0d9488" }, // teal-600
    { name: "Female", value: femalePercentage, fill: "#99f6e4" }, // teal-200
  ];
  
  if (!mounted) return <div className="p-6 bg-white rounded-lg shadow-sm h-96 flex items-center justify-center">Loading Chart...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Demographics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Donut Chart */}
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <span className="block text-2xl font-bold text-gray-800">{malePercentage + femalePercentage}%</span>
              <span className="text-xs text-gray-500 font-medium uppercase">Total Crowd</span>
            </div>
          </div>
        </div>

        {/* Stacked Area Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#99f6e4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#99f6e4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 10 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 10 }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area
                type="monotone"
                dataKey="male"
                stackId="1"
                stroke="#0d9488"
                fill="url(#colorMale)"
              />
              <Area
                type="monotone"
                dataKey="female"
                stackId="1"
                stroke="#99f6e4"
                fill="url(#colorFemale)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DemographicsChart;
