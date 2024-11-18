import React from 'react'

const AddedAPI = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Added APIs</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 text-gray-600">API Name</th>
            <th className="px-4 py-2 text-gray-600">Description</th>
            <th className="px-4 py-2 text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">Weather API</td>
            <td className="px-4 py-2">Provides real-time weather updates</td>
            <td className="px-4 py-2 text-green-600">Active</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Maps API</td>
            <td className="px-4 py-2">Offers geolocation and maps features</td>
            <td className="px-4 py-2 text-yellow-600">Inactive</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

)}

export default AddedAPI