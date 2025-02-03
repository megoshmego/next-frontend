"use client";


import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import { ChartData } from "chart.js"; // ✅ Use Chart.js built-in type

export default function Dashboard() {
  const [lineData, setLineData] = useState<ChartData<"line"> | null>(null);
  const [barData, setBarData] = useState<ChartData<"bar"> | null>(null);
  const [pieData, setPieData] = useState<ChartData<"pie"> | null>(null);

  const API_BASE_URL = "https://django-backend-qyn7.onrender.com/api/";

  useEffect(() => {
    axios.get(`${API_BASE_URL}line-chart-data/`).then((response) =>
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
  
    axios.get(`${API_BASE_URL}bar-chart-data/`).then((response) =>
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
  
    axios.get(`${API_BASE_URL}pie-chart-data/`).then((response) =>
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
  