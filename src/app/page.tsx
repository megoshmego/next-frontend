"use client";


import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import { ChartData } from "chart.js"; // ✅ Use Chart.js built-in type

export default function Dashboard() {
  const [lineData, setLineData] = useState<ChartData<"line"> | null>(null);
  const [barData, setBarData] = useState<ChartData<"bar"> | null>(null);
  const [pieData, setPieData] = useState<ChartData<"pie"> | null>(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/line-chart-data/").then((response) =>
      setLineData({
        labels: response.data.labels,
        datasets: [
          {
            label: "Line Chart",
            data: response.data.data,
            backgroundColor: "rgb(75, 192, 192)",
            borderColor: "rgb(75, 192, 192)",
            fill: false,
          },
        ],
      })
    );

    axios.get("http://127.0.0.1:8000/api/bar-chart-data/").then((response) =>
      setBarData({
        labels: response.data.labels,
        datasets: [
          {
            label: "Bar Chart",
            data: response.data.data,
            backgroundColor: "rgb(255, 99, 132)",
          },
        ],
      })
    );

    axios.get("http://127.0.0.1:8000/api/pie-chart-data/").then((response) =>
      setPieData({
        labels: response.data.labels,
        datasets: [
          {
            label: "Pie Chart",
            data: response.data.data,
            backgroundColor: ["#f87171", "#60a5fa", "#facc15"],
          },
        ],
      })
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        📊 Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lineData && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              📈 Line Chart
            </h2>
            <Line data={lineData} />
          </div>
        )}
        {barData && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              📊 Bar Chart
            </h2>
            <Bar data={barData} />
          </div>
        )}
        {pieData && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              🥧 Pie Chart
            </h2>
            <Pie data={pieData} />
          </div>
        )}
      </div>
    </div>
  );
}
