import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function StudyChart({ data, title }) {
  return (
    <div className="rounded-2xl bg-slate-900/85 border border-slate-800/80 p-4 shadow-md shadow-slate-950/60 backdrop-blur">
      <p className="text-sm text-slate-100 font-medium mb-2">{title}</p>
      {data.length === 0 ? (
        <p className="text-xs text-slate-500">
          No sessions yet. Start a few on the Focus page and come back.
        </p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                axisLine={{ stroke: "#1f2937" }}
                tickLine={{ stroke: "#1f2937" }}
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                axisLine={{ stroke: "#1f2937" }}
                tickLine={{ stroke: "#1f2937" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #1e293b",
                  borderRadius: "0.75rem",
                  fontSize: "12px",
                  color: "#e5e7eb",
                }}
                labelStyle={{ color: "#e5e7eb" }}
                itemStyle={{ color: "#c4b5fd" }}
              />
              <Bar
                dataKey="minutes"
                radius={[10, 10, 3, 3]}
                fill="#a855f7" // violet-500
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default StudyChart;
