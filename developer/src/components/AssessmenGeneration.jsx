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

const GRADES = ["1", "2", "3", "4", "5", "6"];
const ASSESSMENT_TYPES = ["Quiz", "Test", "Project", "Exam"];
const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];
const QUESTION_TYPES = ["Multiple Choice", "True/False", "Short Answer"];
const CURRICULUM_NAMES = [
  "Primary Mathematics",
  "Basic Science",
  "English Language",
];
const STRAND_NAMES = ["Number Operations", "Algebra", "Geometry", "Statistics"];

const AssessmenGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [formData, setFormData] = useState({
    grade: "",
    name: "",
    strandName: "",
    assessmentType: "",
    numberOfQuestions: "",
    difficultyLevel: "",
    questionType: "",
  });

  const simulateAPICall = () => {
    setLoading(true);
    setTimeout(() => {
      setResponseData({
        success: true,
        data: {
          _id: "64f8a123b9e123456789abcd",
          ...formData,
          questions: [
            {
              questionText: "What is 2 + 2?",
              options: ["3", "4", "5", "6"],
              correctAnswer: "4",
              points: 5,
            },
          ],
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
            <h1 className="text-4xl font-bold">Generate Assessment</h1>
            <Badge variant="secondary" className="h-6">
              POST
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Generate a new assessment based on specified parameters
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
                    <Badge variant="default">POST</Badge>
                    <code className="text-sm">/api/assessments/generate</code>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Authentication</h3>
                    <div className="bg-muted p-3 rounded-md">
                      <code>Authorization: Bearer {"<your_token>"}</code>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Request Body</h3>
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
                          <TableCell>String</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Grade level (1-6)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>name</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Curriculum name</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>strandName</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Name of the curriculum strand</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>assessmentType</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>
                            Type of assessment (Quiz, Test, Project, Exam)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>numberOfQuestions</TableCell>
                          <TableCell>Number</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>
                            Number of questions to generate (1-50)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>difficultyLevel</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>
                            Difficulty level (Easy, Medium, Hard)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>questionType</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>
                            Type of questions (Multiple Choice, True/False,
                            Short Answer)
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
                  Generate a new assessment with specified parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      value={formData.grade}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, grade: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {GRADES.map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            Grade {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={formData.name}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, name: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Curriculum" />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRICULUM_NAMES.map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={formData.strandName}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, strandName: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Strand" />
                      </SelectTrigger>
                      <SelectContent>
                        {STRAND_NAMES.map((strand) => (
                          <SelectItem key={strand} value={strand}>
                            {strand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={formData.assessmentType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          assessmentType: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Assessment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ASSESSMENT_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={formData.questionType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          questionType: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Question Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {QUESTION_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={formData.difficultyLevel}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          difficultyLevel: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Difficulty Level" />
                      </SelectTrigger>
                      <SelectContent>
                        {DIFFICULTY_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={formData.numberOfQuestions}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            numberOfQuestions: e.target.value,
                          }))
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        min="1"
                        max="50"
                        placeholder="Number of Questions (1-50)"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={simulateAPICall}
                      disabled={
                        loading ||
                        Object.values(formData).some((value) => !value)
                      }
                    >
                      {loading ? (
                        <span className="flex items-center">Loading...</span>
                      ) : (
                        <span className="flex items-center">
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Generate Assessment
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
                            <TableCell>Object</TableCell>
                            <TableCell>Generated assessment object</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>data.grade</TableCell>
                            <TableCell>String</TableCell>
                            <TableCell>Grade level</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>data.name</TableCell>
                            <TableCell>String</TableCell>
                            <TableCell>Curriculum name</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>data.strandName</TableCell>
                            <TableCell>String</TableCell>
                            <TableCell>Name of the curriculum strand</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>data.assessmentType</TableCell>
                            <TableCell>String</TableCell>
                            <TableCell>Type of assessment</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>data.numberOfQuestions</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Number of questions</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>data.difficultyLevel</TableCell>
                            <TableCell>String</TableCell>
                            <TableCell>Difficulty level</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>data.questionType</TableCell>
                            <TableCell>String</TableCell>
                            <TableCell>Type of questions</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>data.questions</TableCell>
                            <TableCell>Array</TableCell>
                            <TableCell>Array of generated questions</TableCell>
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
                          <h4 className="font-medium">400 Bad Request</h4>
                          <pre className="bg-muted mt-2 p-3 rounded-md">
                            <code>
                              {JSON.stringify(
                                {
                                  success: false,
                                  error:
                                    "Required fields are missing or invalid",
                                },
                                null,
                                2
                              )}
                            </code>
                          </pre>
                        </div>
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

export default AssessmenGeneration;
