import { useState } from "react";
import Navbar from "../components/Navbar";

function Settings() {

  const [automaticAnalysis, setAutomaticAnalysis] = useState(
    localStorage.getItem("automaticAnalysis") !== "false"
  );

  const [aiExplanation, setAiExplanation] = useState(
    localStorage.getItem("aiExplanation") !== "false"
  );

  const [leakDetection, setLeakDetection] = useState(
    localStorage.getItem("leakDetection") !== "false"
  );

  const updateSetting = (key, value) => {
    localStorage.setItem(key, value);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white">

      <Navbar />

      <div className="p-8 max-w-4xl">

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-slate-400 mt-2 mb-8">
          Configure ShadowShield AI.
        </p>


        {/* Security */}

        <div className="bg-slate-800 rounded-2xl p-6 mb-6">

          <h2 className="text-xl font-bold mb-6">
            🛡 Security
          </h2>

          <div className="flex justify-between items-center">

            <div>

              <p className="font-semibold">
                Automatic Website Analysis
              </p>

              <p className="text-slate-400 text-sm mt-1">
                Automatically analyze the current website using the browser extension.
              </p>

            </div>

            <input
              type="checkbox"
              checked={automaticAnalysis}
              onChange={(e) => {
                setAutomaticAnalysis(e.target.checked);
                updateSetting("automaticAnalysis", e.target.checked);
              }}
              className="w-5 h-5"
            />

          </div>

        </div>


        {/* AI */}

        <div className="bg-slate-800 rounded-2xl p-6 mb-6">

          <h2 className="text-xl font-bold mb-6">
            🧠 AI Analysis
          </h2>

          <div className="flex justify-between items-center">

            <div>

              <p className="font-semibold">
                Gemini AI Explanations
              </p>

              <p className="text-slate-400 text-sm mt-1">
                Show AI-generated explanations for security results.
              </p>

            </div>

            <input
              type="checkbox"
              checked={aiExplanation}
              onChange={(e) => {
                setAiExplanation(e.target.checked);
                updateSetting("aiExplanation", e.target.checked);
              }}
              className="w-5 h-5"
            />

          </div>

        </div>


        {/* Leak Detection */}

        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-bold mb-6">
            🔐 Data Protection
          </h2>

          <div className="flex justify-between items-center">

            <div>

              <p className="font-semibold">
                Sensitive Data Detection
              </p>

              <p className="text-slate-400 text-sm mt-1">
                Enable sensitive-data scanning and redaction.
              </p>

            </div>

            <input
              type="checkbox"
              checked={leakDetection}
              onChange={(e) => {
                setLeakDetection(e.target.checked);
                updateSetting("leakDetection", e.target.checked);
              }}
              className="w-5 h-5"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;