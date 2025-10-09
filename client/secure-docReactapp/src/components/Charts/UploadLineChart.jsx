import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const UploadLineChart = ({ data }) => {
  if (!Array.isArray(data)) {
    console.error("UploadLineChart expected an array but got:", data);
    return <p>No chart data available</p>;
  }
  const chartData = data.map((item) => ({
    month: new Date(2025, item._id - 1).toLocaleString("default", { month: "short" }),
    uploads: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="uploads" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UploadLineChart;
