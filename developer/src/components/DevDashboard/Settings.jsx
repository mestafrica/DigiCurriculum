import React from 'react'

const Settings = () => {
  return (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Settings</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Account Settings</h3>
        <p className="text-gray-500">Change your account information, email, and password.</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">API Preferences</h3>
        <p className="text-gray-500">Configure default API settings and authentication preferences.</p>
      </div>
    </div>
  </div>
  )
}

export default Settings