import React from "react";
import { ArrowRight, Key, UserPlus, Book, ExternalLink } from "lucide-react";

const GettingStarted = () => {
  const steps = [
    {
      title: "Register as a Developer",
      icon: <UserPlus className="w-6 h-6" />,
      content:
        "To use the Ghana Education Curriculum API, you'll need to register as a developer. This gives you access to all curriculum data across different grades and subjects.",
      action: {
        text: "Register for API access",
        link: "/devlogin",
      },
    },
    {
      title: "Getting your API Key",
      icon: <Key className="w-6 h-6" />,
      content:
        "Your API key is required to authenticate all requests to the API. Include it in the header of your API requests to access curriculum data.",
      substeps: [
        "Log in to your developer dashboard",
        "Navigate to the API Keys section",
        "Copy  API Key",
        "Save your API key securely",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Ghana Education Curriculum API
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Access Ghana's complete education curriculum programmatically. Build
            educational apps, learning management systems, and teaching
            resources using our comprehensive API.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <ExternalLink className="w-4 h-4 mr-2" />
              Sample Applications
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
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Details:
                  </h3>
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
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm  bg-[#D0F4DE] hover:bg-[#D0F4DE] text-primary-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {step.action.text}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-r bg-[#D0F4DE] hover:bg-[#D0F4DE] text-primary-black  rounded-lg shadow-sm p-8 ">
          <h2 className="text-xl font-semibold mb-4">Need Support?</h2>
          <p className="mb-6">
            Our team is here to help you integrate the Ghana Education
            Curriculum API into your educational technology solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center px-4 py-2 border  rounded-md text-sm font-medium border-[#A9DEF9]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
              Contact Developer Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
