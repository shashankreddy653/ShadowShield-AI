import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getWebsiteHistory, getLeakHistory } from "../api";

function History() {
  const [websiteHistory, setWebsiteHistory] = useState([]);
  const [leakHistory, setLeakHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const [websiteResponse, leakResponse] = await Promise.all([
        getWebsiteHistory(),
        getLeakHistory(),
      ]);

      const websiteData = Array.isArray(websiteResponse)
        ? websiteResponse
        : websiteResponse?.data || [];

      const leakData = Array.isArray(leakResponse)
        ? leakResponse
        : leakResponse?.data || [];

      setWebsiteHistory(websiteData);
      setLeakHistory(leakData);
    } catch (error) {
      console.error("History error:", error);
      setError("Unable to load scan history.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskStyle = (risk) => {
    const level = risk?.toLowerCase();

    if (level === "high") {
      return "bg-red-500/20 text-red-400 border border-red-500/30";
    }

    if (level === "medium") {
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    }

    return "bg-green-500/20 text-green-400 border border-green-500/30";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Scan History
          </h1>

          <p className="text-slate-400 mt-2">
            View previous website and sensitive-data scans.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="bg-slate-800 rounded-2xl p-8 text-center">
            <p className="text-cyan-400 text-lg">
              Loading scan history...
            </p>
          </div>
        ) : (
          <>

            {/* ===================================== */}
            {/* WEBSITE SCAN HISTORY */}
            {/* ===================================== */}

            <div className="bg-slate-800 rounded-2xl p-6 mb-8">

              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-white">
                  🌐 Website Scan History
                </h2>

                <span className="text-sm text-slate-400">
                  {websiteHistory.length} scan
                  {websiteHistory.length !== 1 ? "s" : ""}
                </span>
              </div>

              {websiteHistory.length === 0 ? (

                <div className="text-center py-10">
                  <div className="text-4xl mb-3">
                    🌐
                  </div>

                  <p className="text-slate-400">
                    No website scans yet.
                  </p>
                </div>

              ) : (

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead>
                      <tr className="text-left text-slate-400 border-b border-slate-700">

                        <th className="p-3">
                          URL
                        </th>

                        <th className="p-3">
                          Score
                        </th>

                        <th className="p-3">
                          Risk
                        </th>

                        <th className="p-3">
                          Date
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      {websiteHistory.map((item, index) => (

                        <tr
                          key={item.id || index}
                          className="border-b border-slate-700 hover:bg-slate-700/30 transition"
                        >

                          {/* URL */}
                          <td className="p-3 text-white font-medium break-all">
                            {item.url}
                          </td>

                          {/* Score */}
                          <td className="p-3">

                            <span className="text-white font-bold">
                              {item.risk_score ?? item.score ?? 0}/100
                            </span>

                          </td>

                          {/* Risk */}
                          <td className="p-3">

                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskStyle(
                                item.risk_level ?? item.risk
                              )}`}
                            >
                              {item.risk_level ?? item.risk ?? "Unknown"}
                            </span>

                          </td>

                          {/* Date */}
                          <td className="p-3 text-slate-400 whitespace-nowrap">
                            {item.analyzed_at || "-"}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>


            {/* ===================================== */}
            {/* SENSITIVE DATA / LEAK HISTORY */}
            {/* ===================================== */}

            <div className="bg-slate-800 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-5">

                <h2 className="text-xl font-bold text-white">
                  🔐 Sensitive Data Scan History
                </h2>

                <span className="text-sm text-slate-400">
                  {leakHistory.length} scan
                  {leakHistory.length !== 1 ? "s" : ""}
                </span>

              </div>

              {leakHistory.length === 0 ? (

                <div className="text-center py-10">

                  <div className="text-4xl mb-3">
                    🔐
                  </div>

                  <p className="text-slate-400">
                    No sensitive-data scans yet.
                  </p>

                </div>

              ) : (

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead>

                      <tr className="text-left text-slate-400 border-b border-slate-700">

                        <th className="p-3">
                          ID
                        </th>

                        <th className="p-3">
                          Secrets Found
                        </th>

                        <th className="p-3">
                          Date
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {leakHistory.map((item, index) => (

                        <tr
                          key={item.id || index}
                          className="border-b border-slate-700 hover:bg-slate-700/30 transition"
                        >

                          {/* ID */}
                          <td className="p-3 text-white font-medium">
                            {item.id || index + 1}
                          </td>

                          {/* Secrets */}
                          <td className="p-3">

                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                (item.secrets_found ?? 0) > 0
                                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                  : "bg-green-500/20 text-green-400 border border-green-500/30"
                              }`}
                            >
                              {item.secrets_found ?? 0}
                            </span>

                          </td>

                          {/* Date */}
                          <td className="p-3 text-slate-400 whitespace-nowrap">
                            {item.analyzed_at ||
                              item.scanned_at ||
                              item.created_at ||
                              "-"}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </>
        )}

      </div>
    </div>
  );
}

export default History;