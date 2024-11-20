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

const GetAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const simulateAPICall = () => {
    if (!selectedType) return;

    setLoading(true);
    setTimeout(() => {
      setResponseData({
        success: true,
        data: {
          _id: "64f8a123b9e123456789abcd",
          strandCode: "NO",
          subStrandCode: "NO1",
          performanceIndicatorCode: "NO1.1",
          assessmentType: selectedType,
          questions: [
            {
              questionText: "What is 2 + 2?",
              options: ["3", "4", "5", "6"],
              correctAnswer: "4",
              points: 5,
            },
          ],
          totalPoints: 100,
          duration: 60,
          questionType: "Multiple Choice",
          difficultyLevel: "Medium",
          numberOfQuestions: 20,
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
            <h1 className="text-4xl font-bold">Get Assessment</h1>
            <Badge variant="secondary" className="h-6">
              GET
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Retrieve assessment details for specific strands and performance
            indicators
          </p>
        </div>

        <Tabs
          defaultValue="overview"
          className="space-y-4"
          onValueChange={setActiveTab}
        >
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
                    <code className="text-sm">
                      /api/assessment/{"{strandCode}"}/{"{subStrandCode}"}
                    </code>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Authentication</h3>
                    <div className="bg-muted p-3 rounded-md">
                      <code>Authorization: Bearer {"<your_token>"}</code>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Path Parameters</h3>
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
                          <TableCell>strandCode</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>The strand code (e.g., NO)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>subStrandCode</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>No</TableCell>
                          <TableCell>The sub-strand code (e.g., NO1)</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
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
                  Try out the API endpoint by selecting assessment parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Quiz", "Test", "Project", "Exam"].map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={simulateAPICall}
                      disabled={loading || !selectedType}
                    >
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
                            <TableCell>strandCode</TableCell>
                            <TableCell>String</TableCell>
                            <TableCell>
                              Unique identifier for the strand
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>assessmentType</TableCell>
                            <TableCell>String</TableCell>
                            <TableCell>
                              Type of assessment (Quiz, Test, Project, Exam)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>questions</TableCell>
                            <TableCell>Array</TableCell>
                            <TableCell>Array of question objects</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>totalPoints</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>
                              Total points possible for the assessment
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>duration</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Duration in minutes</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>difficultyLevel</TableCell>
                            <TableCell>String</TableCell>
                            <TableCell>
                              Difficulty level (Easy, Medium, Hard)
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
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
                        <div>
                          <h4 className="font-medium">404 Not Found</h4>
                          <pre className="bg-muted mt-2 p-3 rounded-md">
                            <code>
                              {JSON.stringify(
                                {
                                  success: false,
                                  error:
                                    "Assessment not found for specified parameters",
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

export default GetAssessment;