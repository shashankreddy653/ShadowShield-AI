import { Search, Bell, CircleUserRound } from "lucide-react";

function Navbar() {
  return (
    <div className="flex justify-between items-center bg-slate-950 px-8 py-5 border-b border-slate-800">

      <div>
        <h1 className="text-5xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-1">
          Welcome to ShadowShield AI
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="flex items-center bg-slate-800 rounded-xl px-4 py-2 w-72">
          <Search className="text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white ml-3 w-full"
          />
        </div>

        <Bell className="text-white cursor-pointer hover:text-cyan-400" size={28} />

        <CircleUserRound
          className="text-cyan-400 cursor-pointer"
          size={38}
        />

      </div>
    </div>
  );
}

export default Navbar;