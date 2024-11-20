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

const GetCurriculumByGrade = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Simulated API call
  const simulateAPICall = () => {
    if (!selectedGrade) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setResponseData({
        success: true,
        data: {
          _id: "60f12345c7e123456789abcd",
          name: `Grade ${selectedGrade} Mathematics`,
          code: `MATH-G${selectedGrade}`,
          grade: parseInt(selectedGrade),
          strands: [
            {
              name: "Number Operations",
              code: "NO",
              subStrand: [
                {
                  code: "NO1",
                  title: "Whole Numbers",
                  contentStandards: `Demonstrate understanding of whole numbers appropriate for Grade ${selectedGrade}`,
                  learningIndicators: [
                    `Perform grade ${selectedGrade} level number operations`,
                    `Apply mathematical concepts suitable for grade ${selectedGrade}`,
                  ],
                },
              ],
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-4xl font-bold">Get Curriculum by Grade</h1>
            <Badge variant="secondary" className="h-6">
              GET
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Retrieve curriculum details for a specific grade level in the Ghana
            Education System
          </p>
        </div>

        {/* Main Content Tabs */}
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

          {/* Overview Tab */}
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
                      /api/curriculum/grade/{"{grade}"}
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
                          <TableCell>grade</TableCell>
                          <TableCell>Number</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>
                            The grade level to retrieve (1-12)
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Try It Tab */}
          <TabsContent value="try-it" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test API Endpoint</CardTitle>
                <CardDescription>
                  Try out the API endpoint by selecting a grade level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Select
                      value={selectedGrade}
                      onValueChange={setSelectedGrade}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(12)].map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            Grade {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={simulateAPICall}
                      disabled={loading || !selectedGrade}
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

          {/* Response Schema Tab */}
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
                            <TableCell>Object</TableCell>
                            <TableCell>
                              Curriculum object for the specified grade
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
                                    "Curriculum not found for specified grade",
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

export default GetCurriculumByGrade;
