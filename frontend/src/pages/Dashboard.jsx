import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import IncidentTable from "../components/IncidentTable";
import AIAnalysisCard from "../components/AIAnalysisCard";
import RecentActivity from "../components/RecentActivity";
import RiskChart from "../components/RiskChart";

function Dashboard() {
  return (
    <div className="bg-slate-900 min-h-screen p-0">
      <Navbar />

      <div className="p-8">

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard
  title="Total Scans"
  value="245"
  color="text-cyan-400"
  icon="📊"
/>

<StatCard
  title="High Risk"
  value="17"
  color="text-red-500"
  icon="🚨"
/>

<StatCard
  title="Medium Risk"
  value="58"
  color="text-yellow-400"
  icon="⚠️"
/>

<StatCard
  title="Safe Prompts"
  value="170"
  color="text-green-400"
  icon="✅"
/>

        </div>

        {/* Incident Table + AI Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

          <div className="lg:col-span-2">
            <IncidentTable />
          </div>

          <AIAnalysisCard />

        </div>

        {/* Recent Activity + Risk Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          <RecentActivity />

          <RiskChart />

        </div>

        {/* Test Box */}
       

      </div>
    </div>
  );
}

export default Dashboard;