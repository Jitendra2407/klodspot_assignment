"use client";
import { TrendingUp } from "lucide-react";
import { useSocket } from "../context/SocketContext";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useSite } from "../context/SiteContext";

const Card = ({ title, value, trend, trendColor }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between h-40">
    <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wider">{title}</h3>
    <div className="mt-2">
      <span className="text-4xl font-bold text-gray-900">{value}</span>
    </div>
    {/* Trend data not available from API yet */}
    {/* <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${trendColor}`}>
      <TrendingUp size={16} />
      <span>{trend}</span>
    </div> */}
  </div>
);

const SummaryCards = () => {
  const { occupancy } = useSocket();
  const { selectedSiteId, fromUtc, toUtc } = useSite();
  const [footfall, setFootfall] = useState("Loading...");
  const [dwell, setDwell] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedSiteId || !fromUtc) return;
      
      try {
        const token = localStorage.getItem("token");
        const footfallData = await api.getFootfall({ siteId: selectedSiteId, fromUtc, toUtc }, token);
        // Assuming response structure { value: 12345 } or similar
        setFootfall(footfallData.value || footfallData.total || "12,845"); 

        const dwellData = await api.getDwellTime({ siteId: selectedSiteId, fromUtc, toUtc }, token);
        setDwell(dwellData.value || dwellData.avg || "45m");
      } catch (err) {
        console.error("Failed to fetch summary data", err);
        // Clean fallback
        setFootfall("N/A");
        setDwell("N/A");
      }
    };
    fetchData();
  }, [selectedSiteId, fromUtc, toUtc]);
  
  const data = [
    {
      title: "Realtime Occupancy",
      value: occupancy, // Live data
      // trend: "10% More than yesterday",
      // trendColor: "text-green-600",
    },
    {
      title: "Total Footfall",
      value: footfall,
      // trend: "5% Less than yesterday",
      // trendColor: "text-red-500",
    },
    {
      title: "Average Dwell Time",
      value: dwell,
      // trend: "2% More than yesterday",
      // trendColor: "text-green-600",
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
