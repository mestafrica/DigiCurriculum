import React from 'react'

const DeveloperHome = () => {
    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Your Dashboard</h2>
                <p className="text-lg text-gray-600">This is the place where you can manage your APIs, view usage analytics, and configure your settings.</p>
                <div className="mt-8 flex space-x-6">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3">
                        <h3 className="text-xl font-semibold text-gray-700">Active APIs</h3>
                        <p className="text-gray-500">Monitor the status and performance of your active APIs.</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3">
                        <h3 className="text-xl font-semibold text-gray-700">Usage Analytics</h3>
                        <p className="text-gray-500">Analyze the usage and health of your APIs with detailed graphs.</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3">
                        <h3 className="text-xl font-semibold text-gray-700">Recent Activity</h3>
                        <p className="text-gray-500">Keep track of recent changes, updates, and requests on your APIs.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeveloperHome