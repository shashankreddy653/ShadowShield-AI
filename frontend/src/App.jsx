import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import History from "./pages/History";
import Settings from "./pages/Settings";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex bg-slate-900 min-h-screen">
      <Sidebar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;