import React from "react";
import { Code, ArrowRight, Clipboard, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AssessmentEndpoints = () => {
  const endpoints = [
    {
      method: "GET",
      path: "/api/assessments",
      title: "List All Assessments",
      description:
        "Returns a paginated list of all available assessments with optional filtering",
      queryParams: [
        {
          name: "page",
          type: "number",
          description: "Page number (default: 1)",
        },
        {
          name: "limit",
          type: "number",
          description: "Items per page (default: 10)",
        },
        {
          name: "grade",
          type: "string",
          description: "Filter by grade level (1-6)",
        },
        {
          name: "assessmentType",
          type: "string",
          description: "Filter by type (Quiz, Test, Project, Exam)",
        },
        {
          name: "difficultyLevel",
          type: "string",
          description: "Filter by difficulty (Easy, Medium, Hard)",
        },
        {
          name: "questionType",
          type: "string",
          description: "Filter by question type",
        },
      ],
      responseExample: {
        success: true,
        data: [
          {
            grade: "1",
            name: "Basic Mathematics Assessment",
            strandName: "Number Operations",
            assessmentType: "Quiz",
            numberOfQuestions: 20,
            difficultyLevel: "Easy",
            questionType: "Multiple Choice",
          },
        ],
        pagination: {
          currentPage: 1,
          totalPages: 5,
          totalItems: 48,
          itemsPerPage: 10,
        },
      },
    },
    {
      method: "GET",
      path: "/api/assessments/{id}",
      title: "Get Assessment by ID",
      description: "Retrieves a specific assessment by its unique identifier",
      params: [
        {
          name: "id",
          type: "string",
          description: "Assessment unique identifier",
        },
      ],
      responseExample: {
        grade: "1",
        name: "Basic Mathematics Assessment",
        strandName: "Number Operations",
        assessmentType: "Quiz",
        numberOfQuestions: 20,
        difficultyLevel: "Easy",
        questionType: "Multiple Choice",
        questions: [
          {
            questionText: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: "4",
            points: 5,
          },
        ],
      },
    },
    {
      method: "GET",
      path: "/api/assessments/strand/{strandName}",
      title: "Get Assessments by Strand",
      description: "Returns all assessments for a specific curriculum strand",
      params: [
        {
          name: "strandName",
          type: "string",
          description: "Name of the curriculum strand",
        },
      ],
      queryParams: [
        {
          name: "grade",
          type: "string",
          description: "Filter by grade (optional)",
        },
        {
          name: "difficultyLevel",
          type: "string",
          description: "Filter by difficulty (optional)",
        },
      ],
    },
    {
      method: "GET",
      path: "/api/assessments/grade/{grade}",
      title: "Get Assessments by Grade",
      description: "Returns all assessments for a specific grade level",
      params: [
        { name: "grade", type: "string", description: "Grade level (1-6)" },
      ],
      queryParams: [
        {
          name: "assessmentType",
          type: "string",
          description: "Filter by type (optional)",
        },
        {
          name: "difficultyLevel",
          type: "string",
          description: "Filter by difficulty (optional)",
        },
      ],
    },
  ];

  const MethodBadge = ({ method }) => {
    const colors = {
      GET: "bg-green-100 text-green-700",
      POST: "bg-blue-100 text-blue-700",
      PUT: "bg-yellow-100 text-yellow-700",
      DELETE: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-2 py-1 rounded-md text-sm font-medium ${colors[method]}`}
      >
        {method}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Assessment API Endpoints
        </h1>
        <p className="text-gray-600">
          Complete reference for all available assessment endpoints in the Ghana
          Education Curriculum API. All requests must include your API key in
          the Authorization header.
        </p>
      </div>

      {/* Authentication Example */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code className="text-sm text-gray-800">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <div className="space-y-6">
        {endpoints.map((endpoint, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{endpoint.title}</CardTitle>
                <MethodBadge method={endpoint.method} />
              </div>
            </CardHeader>
            <CardContent>
              {/* Path */}
              <div className="mb-4">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <code className="text-sm font-mono">{endpoint.path}</code>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Clipboard className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4">{endpoint.description}</p>

              {/* Parameters if any */}
              {endpoint.params && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Path Parameters</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {endpoint.params.map((param, idx) => (
                      <div key={idx} className="mb-2 last:mb-0">
                        <code className="text-sm font-mono text-blue-600">
                          {param.name}
                        </code>
                        <span className="text-sm text-gray-600 ml-2">
                          ({param.type}) - {param.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Query Parameters if any */}
              {endpoint.queryParams && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Query Parameters</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {endpoint.queryParams.map((param, idx) => (
                      <div key={idx} className="mb-2 last:mb-0">
                        <code className="text-sm font-mono text-blue-600">
                          {param.name}
                        </code>
                        <span className="text-sm text-gray-600 ml-2">
                          ({param.type}) - {param.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Response Example if any */}
              {endpoint.responseExample && (
                <div>
                  <h4 className="font-semibold mb-2">Example Response</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm">
                      <code>
                        {JSON.stringify(endpoint.responseExample, null, 2)}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rate Limits Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Rate Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            The API is rate limited to 1000 requests per hour per API key. Rate
            limit information is included in the response headers:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-4">
            <code className="text-sm block">X-RateLimit-Limit: 1000</code>
            <code className="text-sm block">X-RateLimit-Remaining: 999</code>
            <code className="text-sm block">X-RateLimit-Reset: 1619983436</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentEndpoints;