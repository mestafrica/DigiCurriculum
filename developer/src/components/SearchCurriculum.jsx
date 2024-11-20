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
import { PlayCircle, CheckCircle2, Search } from "lucide-react";

const SearchCurriculum = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLimit, setSelectedLimit] = useState("10");
  const [activeTab, setActiveTab] = useState("overview");

  // Simulated API call
  const simulateAPICall = () => {
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setResponseData({
        success: true,
        count: 2,
        data: [
          {
            _id: "60f12345c7e123456789abcd",
            type: "strand",
            grade: 4,
            name: "Number Operations",
            code: "NO",
            matchedField: "name",
            context: "Found in Grade 4 Mathematics curriculum",
            path: "/curriculum/grade/4/strands/NO",
          },
          {
            _id: "60f12345c7e123456789abce",
            type: "learningIndicator",
            grade: 4,
            content: "Compare and order whole numbers up to 10,000",
            matchedField: "content",
            context: "Part of Number Operations strand in Grade 4",
            path: "/curriculum/grade/4/strands/NO/indicators/1",
          },
        ],
        metadata: {
          searchQuery: searchQuery,
          type: selectedType,
          totalResults: 2,
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
            <h1 className="text-4xl font-bold">Search Curriculum</h1>
            <Badge variant="secondary" className="h-6">
              GET
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Search across all curriculum content including strands, sub-strands,
            and learning indicators
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
                    <code className="text-sm">/api/curriculum/search</code>
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
                          <TableCell>q</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Search query string</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>type</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>No</TableCell>
                          <TableCell>
                            Filter by content type (strand, subStrand,
                            learningIndicator, all)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>limit</TableCell>
                          <TableCell>Number</TableCell>
                          <TableCell>No</TableCell>
                          <TableCell>
                            Number of results per page (default: 10)
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
                  Search across curriculum content using different parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Enter search query..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={simulateAPICall}
                      disabled={loading || !searchQuery.trim()}
                      className="w-full"
                    >
                      {loading ? (
                        <span className="flex items-center">Loading...</span>
                      ) : (
                        <span className="flex items-center">
                          <Search className="mr-2 h-4 w-4" />
                          Search
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
                            <TableCell>count</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Number of results found</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>data</TableCell>
                            <TableCell>Array</TableCell>
                            <TableCell>Array of search results</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>metadata</TableCell>
                            <TableCell>Object</TableCell>
                            <TableCell>
                              Search metadata including query params
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
                          <h4 className="font-medium">400 Bad Request</h4>
                          <pre className="bg-muted mt-2 p-3 rounded-md">
                            <code>
                              {JSON.stringify(
                                {
                                  success: false,
                                  error: "Search query is required",
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

export default SearchCurriculum;