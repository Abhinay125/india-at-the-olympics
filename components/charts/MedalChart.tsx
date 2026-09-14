"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { medals } from "@/data/medals";
import { aggregateMedalsByYear } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
      <p className="font-bold text-navy-800 mb-2">
        {label} Olympics
      </p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-navy-600 capitalize">{entry.name}:</span>
          <span className="font-semibold text-navy-800">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function MedalChart() {
  const chartData = useMemo(() => {
    return aggregateMedalsByYear(medals, "summer");
  }, []);

  return (
    <section className="container-wide py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
          Medals by Olympic Year
        </h2>
        <p className="text-navy-500 mt-3">
          India&apos;s medal count across Summer Olympic Games
        </p>
      </div>
      
      <div className="card p-6 md:p-8">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400} minWidth={600}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12, fill: "#6B7280" }}
                tickLine={false}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6B7280" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                formatter={(value: string) => (
                  <span className="text-navy-600 text-sm capitalize">{value}</span>
                )}
              />
              <Bar
                dataKey="gold"
                fill="#C9A96E"
                radius={[4, 4, 0, 0]}
                name="Gold"
              />
              <Bar
                dataKey="silver"
                fill="#A8A9AD"
                radius={[4, 4, 0, 0]}
                name="Silver"
              />
              <Bar
                dataKey="bronze"
                fill="#CD7F32"
                radius={[4, 4, 0, 0]}
                name="Bronze"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
