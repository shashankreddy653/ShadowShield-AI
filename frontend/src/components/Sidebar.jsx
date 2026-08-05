import {
  LayoutDashboard,
  ShieldAlert,
  History,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
    },
    {
      name: "Incidents",
      icon: <ShieldAlert size={20} />,
      path: "/incidents",
    },
    {
      name: "History",
      icon: <History size={20} />,
      path: "/history",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <div className="w-64 h-screen sticky top-0 bg-slate-950 text-white p-6">

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-cyan-400">
          🛡 ShadowShield
        </h1>

        <p className="text-slate-500 text-sm mt-1">
          AI Security Dashboard
        </p>
      </div>

      <nav className="space-y-3">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-cyan-500 text-black font-semibold"
                  : "hover:bg-slate-800 text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;