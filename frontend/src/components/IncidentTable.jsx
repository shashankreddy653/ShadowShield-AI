function IncidentTable() {
  const incidents = [
    {
      prompt: "My Gmail is demo@gmail.com",
      risk: "High",
      status: "Blocked",
    },
    {
      prompt: "Hello Gemini, explain React.",
      risk: "Low",
      status: "Safe",
    },
    {
      prompt: "API_KEY = sk-123456789",
      risk: "Critical",
      status: "Blocked",
    },
  ];

  const riskColor = (risk) => {
    switch (risk) {
      case "Critical":
        return "bg-red-600";
      case "High":
        return "bg-orange-500";
      case "Medium":
        return "bg-yellow-500";
      default:
        return "bg-green-600";
    }
  };

  const statusColor = (status) => {
    return status === "Blocked"
      ? "bg-red-600"
      : "bg-green-600";
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Prompt Analysis
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left pb-4 text-slate-400">Prompt</th>
            <th className="text-left pb-4 text-slate-400">Risk</th>
            <th className="text-left pb-4 text-slate-400">Status</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((item, index) => (
            <tr
              key={index}
              className="border-b border-slate-700 hover:bg-slate-700 transition"
            >
              <td className="py-5 text-white">
                {item.prompt}
              </td>

              <td>
                <span
                  className={`${riskColor(
                    item.risk
                  )} px-3 py-1 rounded-full text-white text-sm`}
                >
                  {item.risk}
                </span>
              </td>

              <td>
                <span
                  className={`${statusColor(
                    item.status
                  )} px-3 py-1 rounded-full text-white text-sm`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncidentTable;