import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Verified", value: 8 },
  { name: "Pending", value: 4 },
  { name: "Rejected", value: 3 },
];

const COLORS = ["#27c7a9", "orange", "red"];

export default function StatusPieChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
          dataKey="value"
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
