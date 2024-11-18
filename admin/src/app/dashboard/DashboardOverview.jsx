import React from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const DashboardOverview = () => {
  const summaryData = [
    { label: "Total Curricular", value: 12, icon: "📘", subtitle: "(current year)" },
    { label: "Calendars", value: 8, icon: "📅", subtitle: "(current year)" },
    { label: "Lesson Plan", value: 15, icon: "📝", subtitle: "(current year)" },
    { label: "Assessment", value: 20, icon: "🧪", subtitle: "(current year)" },
  ];

  const pieData = {
    labels: ["Category A", "Category B", "Category C"],
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

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Hi, [User Name]. Welcome back to your admin portal</h2>

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
          <h3 className="text-lg font-bold text-gray-700 mb-4">Top Courses By You</h3>
          <div className="w-full h-52">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-700">Enrollment Trends</h3>
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
