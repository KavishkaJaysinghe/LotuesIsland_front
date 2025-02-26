import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const DestinationBarChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Destinations",
        data: [],
      },
    ],
    options: {
      chart: {
        height: "100%",
        type: "bar", // Bar chart type
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["#1C64F2"],
      },
      xaxis: {
        categories: [], // This will be populated with destination names
        labels: {
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
        title: {
          text: "Count",
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} destinations`, // Tooltip format
        },
      },
      grid: {
        show: true,
        borderColor: "#e0e0e0",
      },
    },
  });

  useEffect(() => {
    fetchDestinationNames();
  }, []);

  const fetchDestinationNames = async () => {
    try {
      const response = await fetch("/api/destination/get-dest"); // Adjust the URL as per your backend
      const data = await response.json();

      if (data && data.destinations) {
        const destinationNames = data.destinations.map((dest) => dest.destinationName);
        const destinationCount = destinationNames.reduce((acc, name) => {
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        }, {});

        const categories = Object.keys(destinationCount); // Destination names
        const counts = Object.values(destinationCount); // Counts for each name

        setChartData((prev) => ({
          ...prev,
          series: [{ name: "Destinations", data: counts }],
          options: { ...prev.options, xaxis: { categories } },
        }));
      } else {
        console.error("Destinations data is missing or empty.");
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  return (
    <div id="destination-bar-chart">
      <Chart options={chartData.options} series={chartData.series} type="bar" height="100%" />
    </div>
  );
};

export default DestinationBarChart;
