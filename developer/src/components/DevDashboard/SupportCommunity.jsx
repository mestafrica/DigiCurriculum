import React from 'react'

const SupportCommunity = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Support & Community</h2>
    <p className="text-lg text-gray-700">Join the community forums and contact support for any issues.</p>
    <div className="mt-8 space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Community Forums</h3>
        <p className="text-gray-500">Engage with other developers in the API community forums.</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Contact Support</h3>
        <p className="text-gray-500">Get in touch with our support team for help and inquiries.</p>
      </div>
    </div>
  </div>
  )
}

export default SupportCommunity