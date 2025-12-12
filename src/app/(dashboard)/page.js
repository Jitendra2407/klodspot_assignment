import SummaryCards from "../../components/SummaryCards";
import OccupancyChart from "../../components/OccupancyChart";
import DemographicsChart from "../../components/DemographicsChart";
import { Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 font-medium">
          <Calendar size={18} />
          <span>Today</span>
        </div>
      </div>

      {/* Widgets */}
      <SummaryCards />
      <OccupancyChart />
      <DemographicsChart />
    </div>
  );
}
