function StatCard({ title, value, color, icon }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-center">
        <p className="text-slate-400 font-medium">
          {title}
        </p>

        <span className="text-2xl">
          {icon}
        </span>
      </div>

      <h2 className={`text-5xl font-bold mt-5 ${color}`}>
        {value}
      </h2>

      <p className="text-slate-500 text-sm mt-2">
        Updated just now
      </p>

    </div>
  );
}

export default StatCard;