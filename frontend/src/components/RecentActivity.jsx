function RecentActivity() {
  const activities = [
    { time: "10:15 AM", action: "Prompt Blocked", color: "bg-red-500" },
    { time: "10:08 AM", action: "API Key Detected", color: "bg-yellow-500" },
    { time: "09:55 AM", action: "Safe Prompt", color: "bg-green-500" },
    { time: "09:42 AM", action: "Email Detected", color: "bg-cyan-500" },
  ];

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>

              <span className="text-slate-300">
                {item.action}
              </span>
            </div>

            <span className="text-cyan-400 text-sm">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;