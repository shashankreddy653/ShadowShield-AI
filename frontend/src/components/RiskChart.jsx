import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", risk: 20 },
  { day: "Tue", risk: 35 },
  { day: "Wed", risk: 45 },
  { day: "Thu", risk: 60 },
  { day: "Fri", risk: 52 },
  { day: "Sat", risk: 75 },
  { day: "Sun", risk: 68 },
];

function RiskChart() {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg h-full">
      <h2 className="text-2xl font-bold text-white mb-6">
        Weekly Risk Trend
      </h2>

      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#334155" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="risk"
              stroke="#06b6d4"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RiskChart;