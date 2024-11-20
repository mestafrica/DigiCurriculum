import React from "react";
import { ArrowRight, Code } from "lucide-react";

const CurriculumStructure = () => {
  const steps = [
    {
      title: "Understanding the Curriculum Structure",
      icon: <Code className="w-6 h-6" />,
      content:
        "The curriculum is organized hierarchically with strands, sub-strands, content standards, and learning indicators.",
      substeps: [
        "Curriculum contains multiple strands",
        "Each strand has multiple sub-strands",
        "Sub-strands contain content standards",
        "Learning indicators detail specific outcomes",
      ],
    },
  ];

  const codeExample = `
// Example API Response
{
  "name": "Mathematics",
  "code": "MATH-001",
  "grade": 1,
  "strands": [{
    "name": "Number",
    "code": "NUM-1",
    "subStrand": [{
      "code": "NUM-1.1",
      "title": "Number Operations",
      "contentStandards": "Demonstrate understanding of whole numbers...",
      "learningIndicators": [
        "Count objects up to 100",
        "Read and write numerals up to 100"
      ]
    }]
  }]
}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
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
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {step.action.text}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Code Example Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-4">Example Response</h2>
          <pre className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
            <code className="text-sm text-gray-800">{codeExample}</code>
          </pre>
        </div>

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

export default CurriculumStructure;