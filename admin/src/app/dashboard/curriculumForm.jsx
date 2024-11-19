import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Save, ArrowLeft, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { apiPostCurriculum } from "@/services/admin";

const STEPS = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "Strands" },
  { id: 3, title: "Sub-strands" },
  { id: 4, title: "Learning Indicators" },
  { id: 5, title: "Review & Submit" },
];

const CurriculumForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    grade: "",
    description: "",
    strands: [
      {
        name: "",
        code: "",
        subStrand: [
          {
            code: "",
            title: "",
            contentStandards: "",
            learningIndicators: [""],
          },
        ],
      },
    ],
  });

  useEffect(() => {
    // Clear error message when step changes
    setError("");
    setSuccessMessage("");
  }, [currentStep]);

  const handleBasicInfoChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStrandChange = (strandIndex, field, value) => {
    const newStrands = [...formData.strands];
    newStrands[strandIndex][field] = value;
    setFormData({ ...formData, strands: newStrands });
  };

  const handleSubStrandChange = (strandIndex, subStrandIndex, field, value) => {
    const newStrands = [...formData.strands];
    newStrands[strandIndex].subStrand[subStrandIndex][field] = value;
    setFormData({ ...formData, strands: newStrands });
  };

  const handleLearningIndicatorChange = (
    strandIndex,
    subStrandIndex,
    indicatorIndex,
    value
  ) => {
    const newStrands = [...formData.strands];
    newStrands[strandIndex].subStrand[subStrandIndex].learningIndicators[
      indicatorIndex
    ] = value;
    setFormData({ ...formData, strands: newStrands });
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.name || !formData.code || !formData.grade) {
          setError("Please fill in all required basic information fields");
          return false;
        }
        break;
      case 2:
        const invalidStrands = formData.strands.some(
          (strand) => !strand.name || !strand.code
        );
        if (invalidStrands) {
          setError("Please fill in all required strand information");
          return false;
        }
        break;
      case 3:
        const invalidSubStrands = formData.strands.some((strand) =>
          strand.subStrand.some(
            (sub) => !sub.code || !sub.title || !sub.contentStandards
          )
        );
        if (invalidSubStrands) {
          setError("Please fill in all required sub-strand information");
          return false;
        }
        break;
      case 4:
        const invalidIndicators = formData.strands.some((strand) =>
          strand.subStrand.some((sub) =>
            sub.learningIndicators.some((indicator) => !indicator.trim())
          )
        );
        if (invalidIndicators) {
          setError("Please fill in all learning indicators");
          return false;
        }
        break;
    }
    setError("");
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleBasicInfoChange}
            placeholder="Curriculum Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Code <span className="text-red-500">*</span>
          </label>
          <Input
            name="code"
            value={formData.code}
            onChange={handleBasicInfoChange}
            placeholder="Curriculum Code"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Grade <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            name="grade"
            value={formData.grade}
            onChange={handleBasicInfoChange}
            placeholder="Grade Level"
            min="1"
          />
        </div>
      </div>
    </div>
  );

  const renderStrands = () => (
    <div className="space-y-4">
      {formData.strands.map((strand, index) => (
        <Card key={index} className="border border-gray-200">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Strand {index + 1}</span>
              {formData.strands.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    const newStrands = formData.strands.filter(
                      (_, i) => i !== index
                    );
                    setFormData({ ...formData, strands: newStrands });
                  }}
                  className="text-red-500"
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={strand.name}
                    onChange={(e) =>
                      handleStrandChange(index, "name", e.target.value)
                    }
                    placeholder="Strand Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Code <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={strand.code}
                    onChange={(e) =>
                      handleStrandChange(index, "code", e.target.value)
                    }
                    placeholder="Strand Code"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setFormData({
            ...formData,
            strands: [
              ...formData.strands,
              {
                name: "",
                code: "",
                description: "",
                subStrand: [
                  {
                    code: "",
                    title: "",
                    contentStandards: "",
                    learningIndicators: [""],
                  },
                ],
              },
            ],
          });
        }}
        className="w-full"
      >
        <Plus size={16} className="mr-2" />
        Add Strand
      </Button>
    </div>
  );

  const renderSubStrands = () => (
    <div className="space-y-4">
      {formData.strands.map((strand, strandIndex) => (
        <Card key={strandIndex} className="border border-gray-200">
          <CardHeader className="p-4">
            <CardTitle>Strand: {strand.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {strand.subStrand.map((subStrand, subIndex) => (
                <Card key={subIndex} className="border border-gray-200">
                  <CardHeader className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        Sub-Strand {subIndex + 1}
                      </span>
                      {strand.subStrand.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            const newStrands = [...formData.strands];
                            newStrands[strandIndex].subStrand =
                              strand.subStrand.filter((_, i) => i !== subIndex);
                            setFormData({ ...formData, strands: newStrands });
                          }}
                          className="text-red-500"
                        >
                          <X size={16} />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Code <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={subStrand.code}
                            onChange={(e) =>
                              handleSubStrandChange(
                                strandIndex,
                                subIndex,
                                "code",
                                e.target.value
                              )
                            }
                            placeholder="Sub-Strand Code"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Title <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={subStrand.title}
                            onChange={(e) =>
                              handleSubStrandChange(
                                strandIndex,
                                subIndex,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="Sub-Strand Title"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Content Standards{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          value={subStrand.contentStandards}
                          onChange={(e) =>
                            handleSubStrandChange(
                              strandIndex,
                              subIndex,
                              "contentStandards",
                              e.target.value
                            )
                          }
                          placeholder="Content Standards"
                          className="h-24"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const newStrands = [...formData.strands];
                  newStrands[strandIndex].subStrand.push({
                    code: "",
                    title: "",
                    contentStandards: "",
                    learningIndicators: [""],
                  });
                  setFormData({ ...formData, strands: newStrands });
                }}
                className="w-full"
              >
                <Plus size={16} className="mr-2" />
                Add Sub-Strand
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderLearningIndicators = () => (
    <div className="space-y-6">
      {formData.strands.map((strand, strandIndex) => (
        <Card key={strandIndex} className="border border-gray-200">
          <CardHeader className="p-4">
            <CardTitle>Strand: {strand.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {strand.subStrand.map((subStrand, subIndex) => (
              <div key={subIndex} className="mb-6">
                <h3 className="font-medium mb-2">
                  Sub-Strand: {subStrand.title}
                </h3>
                <div className="space-y-3">
                  {subStrand.learningIndicators.map(
                    (indicator, indicatorIndex) => (
                      <div key={indicatorIndex} className="flex gap-2">
                        <Input
                          value={indicator}
                          onChange={(e) =>
                            handleLearningIndicatorChange(
                              strandIndex,
                              subIndex,
                              indicatorIndex,
                              e.target.value
                            )
                          }
                          placeholder={`Learning Indicator ${
                            indicatorIndex + 1
                          }`}
                        />
                        {subStrand.learningIndicators.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                              const newStrands = [...formData.strands];
                              newStrands[strandIndex].subStrand[
                                subIndex
                              ].learningIndicators =
                                subStrand.learningIndicators.filter(
                                  (_, i) => i !== indicatorIndex
                                );
                              setFormData({ ...formData, strands: newStrands });
                            }}
                            className="text-red-500"
                          >
                            <X size={16} />
                          </Button>
                        )}
                      </div>
                    )
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newStrands = [...formData.strands];
                      newStrands[strandIndex].subStrand[
                        subIndex
                      ].learningIndicators.push("");
                      setFormData({ ...formData, strands: newStrands });
                    }}
                    className="w-full mt-2"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Learning Indicator
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <span className="font-medium">Name:</span> {formData.name}
          </div>
          <div>
            <span className="font-medium">Code:</span> {formData.code}
          </div>
          <div>
            <span className="font-medium">Grade:</span> {formData.grade}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Strands</h3>
        {formData?.strands?.map((strand, index) => (
          <div key={index} className="mb-6 pl-4 border-l-2 border-gray-200">
            <h4 className="font-medium">
              Strand {index + 1}: {strand?.name}
            </h4>
            <div className="ml-4 space-y-2">
              <div>Code: {strand?.code}</div>

              <h5 className="font-medium mt-4">Sub-strands:</h5>
              {strand.subStrand.map((sub, subIndex) => (
                <div
                  key={subIndex}
                  className="ml-4 mb-4 pl-4 border-l-2 border-gray-100"
                >
                  <div>Title: {sub?.title}</div>
                  <div>Code: {sub?.code}</div>
                  <div>Content Standards: {sub?.contentStandards}</div>

                  <div className="mt-2">
                    <span className="font-medium">Learning Indicators:</span>
                    <ul className="list-disc ml-6">
                      {sub?.learningIndicators.map((indicator, i) => (
                        <li key={i}>{indicator}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfo();
      case 2:
        return renderStrands();
      case 3:
        return renderSubStrands();
      case 4:
        return renderLearningIndicators();
      case 5:
        return renderReview();
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      const response = await apiPostCurriculum(formData);
      setSuccessMessage(response.message);
      setIsSubmitting(false);
      setFormData({});
    } catch (error) {
      setError(
        error.response.data.error ||
          "Failed to save curriculum. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Curriculum</CardTitle>
          <Progress
            value={(currentStep / STEPS.length) * 100}
            className="mt-2"
          />
          <div className="flex justify-between mt-4">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`text-sm ${
                  currentStep === step.id
                    ? "text-blue-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderCurrentStep()}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <Alert variant="success" className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  {successMessage}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft size={16} className="mr-2" />
                Previous
              </Button>

              {currentStep === STEPS.length ? (
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin mr-2">⌛</div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Submit Curriculum
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Next
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exit Curriculum Creation?</DialogTitle>
            <DialogDescription>
              Are you sure you want to exit? All unsaved changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowExitDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowExitDialog(false);
                // Add navigation logic here
              }}
            >
              Exit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurriculumForm;