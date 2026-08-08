import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getWebsiteHistory } from "../api";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getWebsiteHistory();

      const history = Array.isArray(response)
        ? response
        : response?.data || [];

      // Only show Medium and High risk websites
      const riskyScans = history.filter((item) => {
        const risk = (
          item.risk_level ||
          item.risk ||
          ""
        ).toLowerCase();

        return risk === "medium" || risk === "high";
      });

      setIncidents(riskyScans);
    } catch (error) {
      console.error("Incident error:", error);
      setError("Unable to load security incidents.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskStyle = (risk) => {
    const level = risk?.toLowerCase();

    if (level === "high") {
      return {
        badge:
          "bg-red-500/20 text-red-400 border border-red-500/30",
        score: "text-red-400",
      };
    }

    return {
      badge:
        "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
      score: "text-yellow-400",
    };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Security Incidents
          </h1>

          <p className="text-slate-400 mt-2">
            View detected medium and high-risk websites.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {/* Main Card */}
        <div className="bg-slate-800 rounded-2xl p-6">

          {loading ? (

            <div className="text-center py-12">
              <p className="text-cyan-400 text-lg">
                Loading security incidents...
              </p>
            </div>

          ) : incidents.length === 0 ? (

            /* No Incidents */
            <div className="text-center py-12">

              <div className="text-6xl mb-4">
                🛡️
              </div>

              <h2 className="text-xl font-bold text-white">
                No Security Incidents
              </h2>

              <p className="text-slate-400 mt-2">
                No medium or high-risk scans have been detected.
              </p>

              <p className="text-slate-500 text-sm mt-3">
                Safe websites are not displayed here.
              </p>

            </div>

          ) : (

            /* Incidents List */
            <div className="space-y-5">

              {incidents.map((incident, index) => {

                const risk =
                  incident.risk_level ||
                  incident.risk ||
                  "Unknown";

                const score =
                  incident.risk_score ??
                  incident.score ??
                  0;

                const styles = getRiskStyle(risk);

                return (
                  <div
                    key={incident.id || index}
                    className="bg-slate-900 rounded-xl p-5 border border-slate-700 hover:border-slate-600 transition"
                  >

                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                      {/* Website */}
                      <div className="flex-1">

                        <p className="text-slate-400 text-sm mb-1">
                          Website
                        </p>

                        <p className="text-white font-semibold text-lg break-all">
                          {incident.url}
                        </p>

                        <p className="text-slate-500 text-sm mt-2">
                          Scanned:{" "}
                          {incident.analyzed_at || "Unknown"}
                        </p>

                      </div>

                      {/* Risk */}
                      <div className="md:text-right">

                        <p className="text-slate-400 text-sm mb-1">
                          Risk Score
                        </p>

                        <p
                          className={`text-3xl font-bold ${styles.score}`}
                        >
                          {score}/100
                        </p>

                        <span
                          className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${styles.badge}`}
                        >
                          {risk}
                        </span>

                      </div>

                    </div>


                    {/* AI Summary */}
                    {incident.ai_summary && (
                      <div className="mt-5 bg-slate-800 rounded-xl p-4">

                        <h3 className="text-cyan-400 font-semibold mb-2">
                          🧠 Gemini AI Analysis
                        </h3>

                        <p className="text-slate-300 whitespace-pre-line text-sm leading-6">
                          {incident.ai_summary}
                        </p>

                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

export default Incidents;