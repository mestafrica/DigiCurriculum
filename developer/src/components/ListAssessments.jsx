import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlayCircle, CheckCircle2 } from "lucide-react";

const ASSESSMENT_TYPES = [
  { value: "quiz", label: "Quiz" },
  { value: "test", label: "Test" },
  { value: "project", label: "Project" },
  { value: "exam", label: "Exam" },
];

const DIFFICULTY_LEVELS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const ListAssessments = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    type: "all",
    difficulty: "all",
  });

  const simulateAPICall = () => {
    setLoading(true);
    setTimeout(() => {
      setResponseData({
        success: true,
        data: [
          {
            _id: "64f8a123b9e123456789abcd",
            strandCode: "NO",
            subStrandCode: "NO1",
            performanceIndicatorCode: "NO1.1",
            assessmentType:
              selectedFilters.type === "all" ? "Quiz" : selectedFilters.type,
            totalPoints: 100,
            duration: 60,
            questionType: "Multiple Choice",
            difficultyLevel:
              selectedFilters.difficulty === "all"
                ? "Medium"
                : selectedFilters.difficulty,
            numberOfQuestions: 20,
            questions: [
              {
                questionText: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correctAnswer: "4",
                points: 5,
              },
            ],
          },
          {
            _id: "64f8a123b9e123456789abce",
            strandCode: "NO",
            subStrandCode: "NO2",
            performanceIndicatorCode: "NO2.1",
            assessmentType: "Test",
            totalPoints: 50,
            duration: 30,
            questionType: "Multiple Choice",
            difficultyLevel: "Easy",
            numberOfQuestions: 10,
            questions: [
              {
                questionText: "What is 3 × 3?",
                options: ["6", "7", "8", "9"],
                correctAnswer: "9",
                points: 5,
              },
            ],
          },
        ],
        pagination: {
          currentPage: 1,
          totalPages: 5,
          totalItems: 48,
          itemsPerPage: 10,
        },
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-4xl font-bold">List All Assessments</h1>
            <Badge variant="secondary" className="h-6">
              GET
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Retrieve a paginated list of all available assessments with optional
            filtering
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="try-it">Try It</TabsTrigger>
            <TabsTrigger value="response">Response Schema</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Endpoint Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 bg-muted p-3 rounded-md">
                    <Badge variant="default">GET</Badge>
                    <code className="text-sm">/api/assessments</code>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Authentication</h3>
                    <div className="bg-muted p-3 rounded-md">
                      <code>Authorization: Bearer {"<your_token>"}</code>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Query Parameters</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parameter</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Required</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>page</TableCell>
                          <TableCell>Number</TableCell>
                          <TableCell>No</TableCell>
                          <TableCell>Page number (default: 1)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>limit</TableCell>
                          <TableCell>Number</TableCell>
                          <TableCell>No</TableCell>
                          <TableCell>Items per page (default: 10)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>assessmentType</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>No</TableCell>
                          <TableCell>
                            Filter by type (Quiz, Test, Project, Exam)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>difficultyLevel</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>No</TableCell>
                          <TableCell>
                            Filter by difficulty (Easy, Medium, Hard)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>strandCode</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>No</TableCell>
                          <TableCell>Filter by strand code</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="try-it" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test API Endpoint</CardTitle>
                <CardDescription>
                  Try out the API endpoint with optional filters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Select
                      value={selectedFilters.type}
                      onValueChange={(value) =>
                        setSelectedFilters((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Assessment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {ASSESSMENT_TYPES.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={selectedFilters.difficulty}
                      onValueChange={(value) =>
                        setSelectedFilters((prev) => ({
                          ...prev,
                          difficulty: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Difficulty Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        {DIFFICULTY_LEVELS.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button onClick={simulateAPICall} disabled={loading}>
                      {loading ? (
                        <span className="flex items-center">Loading...</span>
                      ) : (
                        <span className="flex items-center">
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Try it now
                        </span>
                      )}
                    </Button>
                  </div>

                  {responseData && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Response</h4>
                        <Badge variant="outline" className="text-green-600">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          200 OK
                        </Badge>
                      </div>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{JSON.stringify(responseData, null, 2)}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="response" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Response Schema</CardTitle>
                <CardDescription>
                  Detailed breakdown of the response structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="success">
                    <AccordionTrigger>
                      Success Response (200 OK)
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Field</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>success</TableCell>
                            <TableCell>Boolean</TableCell>
                            <TableCell>
                              Indicates if the request was successful
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>data</TableCell>
                            <TableCell>Array</TableCell>
                            <TableCell>Array of assessment objects</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>pagination</TableCell>
                            <TableCell>Object</TableCell>
                            <TableCell>Pagination information</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">
                          Assessment Object Structure
                        </h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Field</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>_id</TableCell>
                              <TableCell>String</TableCell>
                              <TableCell>Unique identifier</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>strandCode</TableCell>
                              <TableCell>String</TableCell>
                              <TableCell>Associated strand code</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>assessmentType</TableCell>
                              <TableCell>String</TableCell>
                              <TableCell>Type of assessment</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>totalPoints</TableCell>
                              <TableCell>Number</TableCell>
                              <TableCell>Total possible points</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>duration</TableCell>
                              <TableCell>Number</TableCell>
                              <TableCell>Duration in minutes</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>difficultyLevel</TableCell>
                              <TableCell>String</TableCell>
                              <TableCell>Difficulty level</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="error">
                    <AccordionTrigger>Error Responses</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">401 Unauthorized</h4>
                          <pre className="bg-muted mt-2 p-3 rounded-md">
                            <code>
                              {JSON.stringify(
                                {
                                  success: false,
                                  error:
                                    "Authentication token is missing or invalid",
                                },
                                null,
                                2
                              )}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ListAssessments;