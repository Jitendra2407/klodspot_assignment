"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Donut Data
const donutData = [
  { name: "Male", value: 65, color: "#14b8a6" }, // Teal-500
  { name: "Female", value: 35, color: "#99f6e4" }, // Teal-200
];

// Timeline Data
const timelineData = [
  { time: "Mon", male: 400, female: 240 },
  { time: "Tue", male: 300, female: 139 },
  { time: "Wed", male: 200, female: 980 },
  { time: "Thu", male: 278, female: 390 },
  { time: "Fri", male: 189, female: 480 },
  { time: "Sat", male: 239, female: 380 },
  { time: "Sun", male: 349, female: 430 },
];

const DemographicsChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Donut / Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center relative min-h-[300px]">
        <h3 className="absolute top-6 left-6 text-lg font-bold text-gray-800">
          Demographics
        </h3>
        <div className="w-full h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Centered Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-gray-400 text-sm font-medium">Total Crowd</span>
            <span className="text-2xl font-bold text-gray-900">100%</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-6 mt-4">
          {donutData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-sm font-medium text-gray-600">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stacked Area Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-[300px]">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Gender Breakdown Trend</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={timelineData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
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
                dataKey="female"
                stackId="1"
                stroke="#99f6e4"
                fill="#99f6e4"
              />
              <Area
                type="monotone"
                dataKey="male"
                stackId="1"
                stroke="#14b8a6"
                fill="#14b8a6"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DemographicsChart;
