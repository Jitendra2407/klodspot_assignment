"use client";
import { TrendingUp } from "lucide-react";
import { useSocket } from "../context/SocketContext";

const Card = ({ title, value, trend, trendColor }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between h-40">
    <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wider">{title}</h3>
    <div className="mt-2">
      <span className="text-4xl font-bold text-gray-900">{value}</span>
    </div>
    <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${trendColor}`}>
      <TrendingUp size={16} />
      <span>{trend}</span>
    </div>
  </div>
);

const SummaryCards = () => {
  const { occupancy } = useSocket();
  
  const data = [
    {
      title: "Realtime Occupancy",
      value: occupancy, // Live data
      trend: "10% More than yesterday",
      trendColor: "text-green-600",
    },
    {
      title: "Total Footfall",
      value: "12,845",
      trend: "5% Less than yesterday",
      trendColor: "text-red-500",
    },
    {
      title: "Average Dwell Time",
      value: "45m",
      trend: "2% More than yesterday",
      trendColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {data.map((item) => (
        <Card key={item.title} {...item} />
      ))}
    </div>
  );
};

export default SummaryCards;
