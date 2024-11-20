import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from "@/components/ui/input";
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
import {
  ArrowRight,
  Code,
  Database,
  File,
  PlayCircle,
  AlertCircle,
  CheckCircle2,
  Copy,
} from "lucide-react";

const GetAllCurricula = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedLimit, setSelectedLimit] = useState("10");
  const [selectedPage, setSelectedPage] = useState("1");
  const [activeTab, setActiveTab] = useState("overview");

  // Simulated API call
  const simulateAPICall = () => {
    setLoading(true);
    setTimeout(() => {
      setResponseData({
        success: true,
        count: 1,
        data: [
          {
            _id: "60f12345c7e123456789abcd",
            name: "Primary Mathematics",
            code: "MATH-PRI",
            grade: parseInt(selectedGrade) || 4,
            strands: [
              {
                name: "Number Operations",
                code: "NO",
                subStrand: [
                  {
                    code: "NO1",
                    title: "Whole Numbers",
                    contentStandards:
                      "Demonstrate understanding of whole numbers up to 10,000",
                    learningIndicators: [
                      "Count numbers up to 10,000",
                      "Compare and order whole numbers up to 10,000",
                    ],
                  },
                ],
              },
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        pagination: {
          currentPage: parseInt(selectedPage),
          totalPages: 1,
          totalRecords: 1,
          hasNextPage: false,
          hasPrevPage: false,
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
            <h1 className="text-4xl font-bold">List All Curricula</h1>
            <Badge variant="secondary" className="h-6">
              GET
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Retrieve a comprehensive list of all available curricula in the
            Ghana Education System
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
                    <code className="text-sm">/api/curriculum</code>
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
                          <TableCell>limit</TableCell>
                          <TableCell>Number</TableCell>
                          <TableCell>No</TableCell>
                          <TableCell>
                            Number of results per page (default: 10)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>page</TableCell>
                          <TableCell>Number</TableCell>
                          <TableCell>No</TableCell>
                          <TableCell>
                            Page number for pagination (default: 1)
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
                  Try out the API endpoint with different parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    onClick={simulateAPICall}
                    disabled={loading}
                    className="w-full "
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
                            <TableCell>count</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Number of curricula returned</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>data</TableCell>
                            <TableCell>Array</TableCell>
                            <TableCell>Array of curriculum objects</TableCell>
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

export default GetAllCurricula;