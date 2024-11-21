import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { apiGetStatistics } from "../../services/admin";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const SkeletonLoader = () => (
  <div className="p-4 space-y-6 animate-pulse">
    {/* Skeleton for welcome text */}
    <div className="h-8 bg-gray-200 rounded w-2/3"></div>

    {/* Skeleton for summary cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-gray-100 rounded-lg p-4 h-32">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
            <div className="w-16 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>

    {/* Skeleton for charts */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-52 bg-gray-200 rounded"></div>
      </div>
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-52 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

const DashboardOverview = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await apiGetStatistics();
        console.log(response)
        setStatistics(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const summaryData = [
    { label: "Total Curricular", value: 12, icon: "📘", subtitle: "(current year)" },
    { label: "Calendars", value: 8, icon: "📅", subtitle: "(current year)" },
    { label: "Lesson Plan", value: 15, icon: "📝", subtitle: "(current year)" },
    { label: "Assessment", value: 20, icon: "🧪", subtitle: "(current year)" },
  ];

  const pieData = {
    labels: ["Assesment", "Lesson Plan", "Calendar"],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Enrollments",
        data: [0.6, 0.7, 0.8, 1.0, 0.9, 0.8, 1.1],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 space-y-6">
      

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {summaryData.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-2">
            <span className="text-4xl">{item.icon}</span>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700">{item.value}</h3>
              <p className="text-sm text-gray-500">{item.label}</p>
              <span className="text-xs text-green-500">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-4">
          {/* <h3 className="text-lg font-bold text-gray-700 mb-4">Assesment Types</h3> */}
          <div className="w-full h-52">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            {/* <h3 className="text-lg font-bold text-gray-700">Enrollment Trends</h3> */}
            <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">Current Year</button>
          </div>
          <div className="w-full h-52">
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;