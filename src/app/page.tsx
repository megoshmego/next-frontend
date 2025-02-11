"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { ChartData } from "chart.js"; // ✅ Use Chart.js built-in type

// 🔹 Register necessary Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

export default function Dashboard() {
  // 🔹 State variables for storing fetched chart data
  const [lineData, setLineData] = useState<ChartData<"line"> | null>(null);
  const [barData, setBarData] = useState<ChartData<"bar"> | null>(null);
  const [pieData, setPieData] = useState<ChartData<"pie"> | null>(null);

  // 🔹 Use the **deployed Django backend URL** (not localhost!)
  const API_BASE_URL = "https://django-backend-qyn7.onrender.com/api/";

  // 🔹 Fetch data when component loads
  useEffect(() => {
    axios.get(`${API_BASE_URL}line-chart-data/`)
      .then((response) => {
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
        });
      })
      .catch((error) => console.error("Error fetching line chart data:", error));

    axios.get(`${API_BASE_URL}bar-chart-data/`)
      .then((response) => {
        setBarData({
          labels: response.data.labels,
          datasets: [
            {
              label: "Bar Chart",
              data: response.data.data,
              backgroundColor: "rgb(255, 99, 132)",
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching bar chart data:", error));

    axios.get(`${API_BASE_URL}pie-chart-data/`)
      .then((response) => {
        setPieData({
          labels: response.data.labels,
          datasets: [
            {
              label: "Pie Chart",
              data: response.data.data,
              backgroundColor: ["#f87171", "#60a5fa", "#facc15"],
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching pie chart data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        📊 Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lineData ? (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              📈 Line Chart
            </h2>
            <Line data={lineData} />
          </div>
        ) : (
          <p className="text-center">Loading Line Chart...</p>
        )}

        {barData ? (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              📊 Bar Chart
            </h2>
            <Bar data={barData} />
          </div>
        ) : (
          <p className="text-center">Loading Bar Chart...</p>
        )}

        {pieData ? (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              🥧 Pie Chart
            </h2>
            <Pie data={pieData} />
          </div>
        ) : (
          <p className="text-center">Loading Pie Chart...</p>
        )}
      </div>
    </div>
  );
}
