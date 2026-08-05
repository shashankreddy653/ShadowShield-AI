function AIAnalysisCard() {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-white mb-6">
        🧠 AI Risk Analysis
      </h2>

      {/* Risk Score */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-slate-300">Risk Score</span>
          <span className="text-red-400 font-bold">92%</span>
        </div>

        <div className="w-full h-3 bg-slate-700 rounded-full">
          <div className="w-[92%] h-3 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Detected */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">
          Detected
        </h3>

        <ul className="space-y-2 text-slate-300">
          <li>📧 Email Address</li>
          <li>🔑 API Key</li>
          <li>⚠ Sensitive Information</li>
        </ul>
      </div>

      {/* Recommendation */}
      <div className="bg-slate-900 rounded-xl p-4">
        <h3 className="text-cyan-400 font-semibold mb-2">
          Recommendation
        </h3>

        <p className="text-slate-300 text-sm">
          Remove sensitive information before sending the prompt.
          Mask email addresses and API keys to prevent data leakage.
        </p>
      </div>

    </div>
  );
}

export default AIAnalysisCard;