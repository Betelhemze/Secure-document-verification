import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const StatusPieChart = ({ stats }) => {
  const data = [
    { name: "Verified", value: stats.verified },
    { name: "Pending", value: stats.pending },
    { name: "Other", value: stats.total - (stats.verified + stats.pending) },
  ];
  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusPieChart;
