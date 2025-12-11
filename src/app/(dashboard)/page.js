import SummaryCards from "../../components/SummaryCards";
import OccupancyChart from "../../components/OccupancyChart";
import DemographicsChart from "../../components/DemographicsChart";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: Today, 5:00 PM
        </div>
      </div>

      {/* Widgets */}
      <SummaryCards />
      <OccupancyChart />
      <DemographicsChart />
    </div>
  );
}
