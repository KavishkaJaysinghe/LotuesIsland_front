import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const UserStatsChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "New users",
        data: [],
      },
    ],
    options: {
      chart: {
        height: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: true, // Show the date in tooltip
          formatter: (value, { dataPointIndex }) => {
            // Get the date from categories and show it in tooltip
            const categories = chartData.options.xaxis.categories;
            return categories && categories[dataPointIndex] ? categories[dataPointIndex] : value;
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0,
        },
      },
      xaxis: {
        categories: [], // Dates for the last month
        labels: {
          show: false, // Hide x-axis labels initially
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    },
  });

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await fetch("/api/user/getusers");
      const data = await response.json();

      if (data && data.dailyUserStats) {
        const dailyUserStats = data.dailyUserStats;

        // Map dailyUserStats to categories (dates) and data (counts)
        const categories = dailyUserStats.map((stat) => stat._id); // Dates
        const counts = dailyUserStats.map((stat) => stat.count); // User counts

        // Update chartData with the new categories and data
        setChartData((prev) => ({
          ...prev,
          series: [{ name: "New users", data: counts }],
          options: { 
            ...prev.options, 
            xaxis: { ...prev.options.xaxis, categories } 
          },
        }));
      } else {
        console.error("dailyUserStats is missing or empty.");
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  return (
    <div id="area-chart">
      <Chart options={chartData.options} series={chartData.series} type="area" height="100%" />
    </div>
  );
};

export default UserStatsChart;
