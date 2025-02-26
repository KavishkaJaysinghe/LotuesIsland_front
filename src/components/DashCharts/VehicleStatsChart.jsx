import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const UserStatsChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "New vehicles",
        data: [],
      },
    ],
    options: {
      chart: {
        height: "100%",
        type: "line", // Changed chart type to "line"
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: true, // Enabled drop shadow for a smoother look
          blur: 3,
          left: 0,
          top: 2,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
        y: {
          formatter: (value) => `${value} vehicles`, // Added tooltip formatting
        },
      },
      markers: {
        size: 6, // Added markers at data points
        colors: ["#1C64F2"],
        strokeColor: "#fff", // White border around the markers
        strokeWidth: 2,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth", // Smooth line
        width: 3, // Thicker line
        colors: ["#1C64F2"],
      },
      grid: {
        show: true,
        borderColor: "#e0e0e0",
        strokeDashArray: 0,
        padding: {
          left: 0,
          right: 0,
          top: 0,
        },
      },
      xaxis: {
        categories: [],
        labels: {
          show: true,
          style: {
            colors: "#9e9e9e",
          },
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            colors: "#9e9e9e",
          },
        },
      },
    },
  });

  useEffect(() => {
    fetchVehicleStats();
  }, []);

  const fetchVehicleStats = async () => {
    try {
      const response = await fetch("/api/vehicles/getvehicles");
      const data = await response.json();

      if (data && data.dailyVehicleStats) {
        const categories = data.dailyVehicleStats.map((stat) => stat._id);
        const counts = data.dailyVehicleStats.map((stat) => stat.count);

        setChartData((prev) => ({
          ...prev,
          series: [{ name: "New vehicles", data: counts }],
          options: { ...prev.options, xaxis: { categories } },
        }));
      } else {
        console.error("dailyVehicleStats is missing or empty.");
      }
    } catch (error) {
      console.error("Error fetching vehicle stats:", error);
    }
  };

  return (
    <div id="line-chart">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height="100%"
      />
    </div>
  );
};

export default UserStatsChart;
