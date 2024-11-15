import React from 'react'

const APIDocumentation = () => {
    return (
        <div className = "bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">API Documentation</h2>
            <p className="text-lg text-gray-700">Here you will find comprehensive documentation for all of your APIs.</p>
            <div className="mt-8 space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700">API Endpoints</h3>
                    <p className="text-gray-500">Get details about all the available API endpoints and their parameters.</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700">Authentication</h3>
                    <p className="text-gray-500">Learn how to authenticate and authorize API requests securely.</p>
                </div>
            </div>
        </div>
    )
}

export default APIDocumentation