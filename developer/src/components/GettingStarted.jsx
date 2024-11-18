import React from 'react';
import { ArrowRight, Key, UserPlus, Book, ExternalLink } from 'lucide-react';

const GettingStarted = () => {
  const steps = [
    {
      title: "Signing up for an account",
      icon: <UserPlus className="w-6 h-6" />,
      content: "To use the Teachable API, you must have a Teachable account on the Pro plan or higher.",
      action: {
        text: "Sign up for a Teachable account",
        link: "#"
      }
    },
    {
      title: "Getting your API Key",
      icon: <Key className="w-6 h-6" />,
      content: "Your API keys are how you authenticate your requests to the API. You'll need to include it in the header of request calls you make to the API.",
      substeps: [
        "Navigate to the Settings → API tab of your Teachable school admin",
        "Click the Create API Key button",
        "In the popup window, enter a Name for your API Key",
        "Click Create"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Getting Started with Teachable API</h1>
          <p className="text-lg text-gray-600 mb-6">
            The following quickstart guide will walk through how to access and make a call to the Teachable API.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Book className="w-4 h-4 mr-2" />
              Authentication Guide
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <ExternalLink className="w-4 h-4 mr-2" />
              API Reference
            </button>
          </div>
        </div>

        {/* Steps Section */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4">
                  {step.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {index + 1}. {step.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-4">{step.content}</p>
              
              {step.substeps && (
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Steps to get your API keys:</h3>
                  <ul className="space-y-3">
                    {step.substeps.map((substep, idx) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{substep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {step.action && (
                <a
                  href={step.action.link}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {step.action.text}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm p-8 text-white">
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <p className="mb-6">
            If you're having trouble setting up your API integration or have questions, our documentation and support team are here to help.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center px-4 py-2 border border-white rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
              View Documentation
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-white rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;