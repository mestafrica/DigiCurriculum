import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Label from "@/components/ui/Label";
import { apiPostCurriculum } from "@/services/admin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CurriculumForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    code: "",
    strands: [
      {
        name: "",
        code: "",
        subStrand: [
          {
            code: "",
            title: "",
            learningIndicators: [""],
          },
        ],
      },
    ],
  });

  // Handle navigation between steps
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Update form data at each step
  const updateFormData = (newData) => setFormData((prev) => ({ ...prev, ...newData }));

  // Handle final submission
  const onSubmit = async () => {
    console.log("Submitting data:", formData); // Debug payload
    try {
      await apiPostCurriculum({ curriculums: [formData] });
      toast.success("Curriculum added successfully!");
      reset(); // Reset form on success
      setStep(1); // Go back to the first step
    } catch (error) {
      toast.error("Failed to submit curriculum. Please try again.");
      console.error("Error submitting curriculum:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <ToastContainer />
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-2xl w-full">
        {step === 1 && (
          <form onSubmit={handleSubmit((data) => { updateFormData(data); nextStep(); })}>
            <h2 className="text-2xl font-semibold mb-6">Add Curriculum</h2>

            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name", { required: "Name is required" })} />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="mt-4">
              <Label htmlFor="grade">Grade</Label>
              <Input id="grade" type="number" {...register("grade", { required: "Grade Level is required", valueAsNumber: true })} />
              {errors.grade && <p className="text-red-500">{errors.grade.message}</p>}
            </div>

            <div className="mt-4">
              <Label htmlFor="code">Code</Label>
              <Input id="code" {...register("code", { required: "Code is required" })} />
              {errors.code && <p className="text-red-500">{errors.code.message}</p>}
            </div>

            <Button type="submit" className="w-full mt-6">Next</Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit((data) => { 
            updateFormData({ strands: [{ ...formData.strands[0], ...data }] });
            nextStep(); 
          })}>
            <h2 className="text-2xl font-semibold mb-6">Strand</h2>

            <div>
              <Label htmlFor="strandName">Strand Name</Label>
              <Input id="strandName" {...register("name", { required: "Strand is required" })} />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="mt-4">
              <Label htmlFor="strandCode">Strand Code</Label>
              <Input id="strandCode" {...register("code", { required: "Strand code is required" })} />
              {errors.code && <p className="text-red-500">{errors.code.message}</p>}
            </div>

            <div className="flex justify-between mt-6">
              <Button type="button" onClick={prevStep}>Previous</Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit((data) => {
            const updatedStrands = [...formData.strands];
            updatedStrands[0].subStrand[0] = { ...updatedStrands[0].subStrand[0], ...data };
            updateFormData({ strands: updatedStrands });
            nextStep();
          })}>
            <h2 className="text-2xl font-semibold mb-6">Sub-strand</h2>

            <div>
              <Label htmlFor="subStrandCode">Sub-strand Code</Label>
              <Input id="subStrandCode" {...register("code", { required: "Sub-strand code is required" })} />
              {errors.code && <p className="text-red-500">{errors.code.message}</p>}
            </div>

            <div className="mt-4">
              <Label htmlFor="subStrandTitle">Sub-strand Title</Label>
              <Input id="subStrandTitle" {...register("title", { required: "Sub-strand title is required" })} />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            <div className="mt-4">
              <Label htmlFor="learningIndicators">Learning Indicators</Label>
              <Input
                id="learningIndicators"
                {...register("learningIndicators", { required: "Learning indicators are required" })}
              />
              {errors.learningIndicators && <p className="text-red-500">{errors.learningIndicators.message}</p>}
            </div>

            <div className="flex justify-between mt-6">
              <Button type="button" onClick={prevStep}>Previous</Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Review Information</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Grade:</strong> {formData.grade}</p>
            <p><strong>Code:</strong> {formData.code}</p>
            <p><strong>Strand Name:</strong> {formData.strands[0].name}</p>
            <p><strong>Strand Code:</strong> {formData.strands[0].code}</p>
            <p><strong>Sub-strand Code:</strong> {formData.strands[0].subStrand[0].code}</p>
            <p><strong>Sub-strand Title:</strong> {formData.strands[0].subStrand[0].title}</p>
            <p><strong>Learning Indicators:</strong> {formData.strands[0].subStrand[0].learningIndicators}</p>

            <div className="flex justify-between mt-6">
              <Button type="button" onClick={prevStep}>Previous</Button>
              <Button onClick={onSubmit}>Submit</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurriculumForm;
