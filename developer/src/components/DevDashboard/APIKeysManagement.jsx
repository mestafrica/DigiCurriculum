import React from 'react'

const APIKeysManagement = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">API Keys Management</h2>
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Generate API Key</h3>
        <p className="text-gray-500">Create new API keys to authenticate your API requests.</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Manage API Keys</h3>
        <p className="text-gray-500">View, regenerate, or delete existing API keys for security purposes.</p>
      </div>
    </div>
  </div>
  )
}

export default APIKeysManagement