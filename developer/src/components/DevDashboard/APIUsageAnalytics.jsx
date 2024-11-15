import React from 'react'

const APIUsageAnalytics = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">API Usage & Analytics</h2>
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Monthly Usage</h3>
        <p className="text-gray-500">Analyze the API usage trends for the past month with visual graphs.</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Request Analytics</h3>
        <p className="text-gray-500">Get detailed statistics on requests, errors, and success rates.</p>
      </div>
    </div>
  </div>
  )
}

export default APIUsageAnalytics