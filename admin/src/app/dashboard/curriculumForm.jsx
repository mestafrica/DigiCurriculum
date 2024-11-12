import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Label from "@/components/ui/Label";
import { apiPostCurriculum } from "@/services/admin";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CurriculumForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    grade: '',
    code: '',
    learningIndicators: '',
    contentStandards: '',
    strandCode: '',
    strandName: '',
    subStrandCode: '',
    subStrandTitle: '',
  });

  // Handle navigation between steps
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Handle form data collection
  const updateFormData = (data) => setFormData((prev) => ({ ...prev, ...data }));

  // Handle final submission with API integration and toast notifications
  const onSubmit = async (data) => {
    updateFormData(data);
    try {
      const response = await apiPostCurriculum(formData);
      toast.success("Curriculum added successfully!"); // Show success toast
    } catch (error) {
      toast.error("Failed to submit curriculum. Please try again."); // Show error toast
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <ToastContainer /> {/* Toast container for displaying notifications */}
      <div className="p-4 bg-white rounded-lg shadow-md max-w-lg w-full">
        {step === 1 && (
          <form onSubmit={handleSubmit((data) => { updateFormData(data); nextStep(); })}>
            <h2 className="text-xl font-semibold mb-4">Add Curriculum</h2>

            <div>
              <Label htmlFor="grade">Grade</Label>
              <Input id="grade" {...register("grade", { required: "Grade is required" })} />
              {errors.grade && <p className="text-red-500">{errors.grade.message}</p>}
            </div>

            <div>
              <Label htmlFor="code">Code</Label>
              <Input id="code" {...register("code", { required: "Code is required" })} />
              {errors.code && <p className="text-red-500">{errors.code.message}</p>}
            </div>

            <div>
              <Label htmlFor="learningIndicators">Learning Indicators</Label>
              <Input id="learningIndicators" {...register("learningIndicators", { required: "Learning indicators are required" })} />
              {errors.learningIndicators && <p className="text-red-500">{errors.learningIndicators.message}</p>}
            </div>

            <div>
              <Label htmlFor="contentStandards">Content Standards</Label>
              <Input id="contentStandards" {...register("contentStandards", { required: "Content standards are required" })} />
              {errors.contentStandards && <p className="text-red-500">{errors.contentStandards.message}</p>}
            </div>

            <Button type="submit" className="w-full mt-4">Next</Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit((data) => { updateFormData(data); nextStep(); })}>
            <h2 className="text-xl font-semibold mb-4">Strand</h2>

            <div>
              <Label htmlFor="strandCode">Code</Label>
              <Input id="strandCode" {...register("strandCode", { required: "Strand code is required" })} />
              {errors.strandCode && <p className="text-red-500">{errors.strandCode.message}</p>}
            </div>

            <div>
              <Label htmlFor="strandName">Name</Label>
              <Input id="strandName" {...register("strandName", { required: "Strand name is required" })} />
              {errors.strandName && <p className="text-red-500">{errors.strandName.message}</p>}
            </div>

            <div className="flex justify-between mt-4">
              <Button type="button" onClick={prevStep}>Previous</Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit((data) => { updateFormData(data); nextStep(); })}>
            <h2 className="text-xl font-semibold mb-4">Sub-strand</h2>

            <div>
              <Label htmlFor="subStrandCode">Code</Label>
              <Input id="subStrandCode" {...register("subStrandCode", { required: "Sub-strand code is required" })} />
              {errors.subStrandCode && <p className="text-red-500">{errors.subStrandCode.message}</p>}
            </div>

            <div>
              <Label htmlFor="subStrandTitle">Title</Label>
              <Input id="subStrandTitle" {...register("subStrandTitle", { required: "Sub-strand title is required" })} />
              {errors.subStrandTitle && <p className="text-red-500">{errors.subStrandTitle.message}</p>}
            </div>

            <div className="flex justify-between mt-4">
              <Button type="button" onClick={prevStep}>Previous</Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Review Information</h2>
            <p><strong>Grade:</strong> {formData.grade}</p>
            <p><strong>Code:</strong> {formData.code}</p>
            <p><strong>Learning Indicators:</strong> {formData.learningIndicators}</p>
            <p><strong>Content Standards:</strong> {formData.contentStandards}</p>
            <p><strong>Strand Code:</strong> {formData.strandCode}</p>
            <p><strong>Strand Name:</strong> {formData.strandName}</p>
            <p><strong>Sub-strand Code:</strong> {formData.subStrandCode}</p>
            <p><strong>Sub-strand Title:</strong> {formData.subStrandTitle}</p>

            <div className="flex justify-between mt-4">
              <Button type="button" onClick={prevStep}>Previous</Button>
              <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurriculumForm;
