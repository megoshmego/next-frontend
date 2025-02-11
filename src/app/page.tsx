useEffect(() => {
  axios.get("https://django-backend-qyn7.onrender.com/api/line-chart-data/")
    .then((response) =>
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

  axios.get("https://django-backend-qyn7.onrender.com/api/bar-chart-data/")
    .then((response) =>
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

  axios.get("https://django-backend-qyn7.onrender.com/api/pie-chart-data/")
    .then((response) =>
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
