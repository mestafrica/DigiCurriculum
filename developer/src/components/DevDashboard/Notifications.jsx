import React from 'react'

const Notifications = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h2>
    <ul className="space-y-4">
      <li className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">API Key Expiration</h3>
        <p className="text-gray-500">Your API key will expire in 3 days. Please renew it soon.</p>
      </li>
      <li className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">New Updates Available</h3>
        <p className="text-gray-500">There are new updates for your API. Check the documentation for details.</p>
      </li>
    </ul>
  </div>
  )
}

export default Notifications