import { useState } from "react";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import IncidentTable from "../components/IncidentTable";
import AIAnalysisCard from "../components/AIAnalysisCard";
import RecentActivity from "../components/RecentActivity";
import RiskChart from "../components/RiskChart";

import { analyzeWebsite } from "../api";

function Dashboard() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    // Prevent duplicate requests
    if (loading) {
      return;
    }

    if (!url.trim()) {
      setError("Please enter a website URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await analyzeWebsite(url.trim());

      setResult(response.data);
    } catch (err) {
      console.error("Analysis error:", err);

      setError(
        err.response?.data?.detail ||
          "Unable to connect to ShadowShield backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-8">

        {/* ================= WEBSITE ANALYZER ================= */}

        <div className="bg-slate-800 rounded-2xl p-6 mb-8">

          <h2 className="text-2xl font-bold text-white mb-4">
            🛡 Website Threat Analyzer
          </h2>

          <div className="flex gap-3">

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAnalyze();
                }
              }}
              placeholder="Enter website URL..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            />

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold px-6 py-3 rounded-xl"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>

          </div>

          {error && (
            <p className="text-red-400 mt-4">
              {error}
            </p>
          )}

        </div>


        {/* ================= ANALYSIS RESULT ================= */}

        {result && (
          <div className="bg-slate-800 rounded-2xl p-6 mb-8">

            <h2 className="text-2xl font-bold text-white mb-5">
              Analysis Result
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Website */}

              <div>
                <p className="text-slate-400">
                  Website
                </p>

                <p className="text-white font-semibold mt-1 break-all">
                  {result.url}
                </p>
              </div>


              {/* Score */}

              <div>
                <p className="text-slate-400">
                  Risk Score
                </p>

                <p className="text-4xl font-bold text-cyan-400 mt-1">
                  {result.score}/100
                </p>
              </div>


              {/* Risk */}

              <div>
                <p className="text-slate-400">
                  Risk Level
                </p>

                <p className="text-3xl font-bold text-white mt-1">
                  {result.risk}
                </p>
              </div>

            </div>


            {/* Detection Results */}

            <div className="mt-6">

              <h3 className="text-white font-semibold mb-3">
                Detection Results
              </h3>

              <ul className="space-y-2">

                {result.reasons?.map((reason, index) => (
                  <li
                    key={index}
                    className="text-slate-300 bg-slate-900 rounded-lg p-3"
                  >
                    {reason}
                  </li>
                ))}

              </ul>

            </div>


            {/* Gemini Explanation */}

            <div className="mt-6 bg-slate-900 rounded-xl p-4">

              <h3 className="text-cyan-400 font-semibold mb-2">
                🧠 Gemini AI Explanation
              </h3>

              <p className="text-slate-300 whitespace-pre-line">
                {result.ai_explanation}
              </p>

            </div>

          </div>
        )}


        {/* ================= STATISTICS ================= */}

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


        {/* ================= INCIDENTS + AI ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

          <div className="lg:col-span-2">
            <IncidentTable />
          </div>

          <AIAnalysisCard />

        </div>


        {/* ================= RECENT ACTIVITY + CHART ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          <RecentActivity />

          <RiskChart />

        </div>

      </div>
    </div>
  );
}

export default Dashboard;