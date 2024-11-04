import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Label from "@/components/ui/Label"; // For default export

import { useForm } from "react-hook-form";

function CurriculumForm({ onSubmit, initialData = {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialData });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      {/* Class Field */}
      <div>
        <Label htmlFor="class">Class</Label>
        <Input
          id="class"
          {...register("class", { required: "Class is required" })}
        />
        {errors.class && <p className="text-red-500">{errors.class.message}</p>}
      </div>

      {/* Strand Field */}
      <div>
        <Label htmlFor="strand">Strand</Label>
        <Input
          id="strand"
          {...register("strand", { required: "Strand is required" })}
        />
        {errors.strand && <p className="text-red-500">{errors.strand.message}</p>}
      </div>

      {/* Sub-strand Field */}
      <div>
        <Label htmlFor="subStrand">Sub-strand</Label>
        <Input
          id="subStrand"
          {...register("subStrand", { required: "Sub-strand is required" })}
        />
        {errors.subStrand && <p className="text-red-500">{errors.subStrand.message}</p>}
      </div>

      {/* Content Standards Field */}
      <div>
        <Label htmlFor="contentStandards">Content Standards</Label>
        <Input
          id="contentStandards"
          {...register("contentStandards", { required: "Content standards are required" })}
        />
        {errors.contentStandards && <p className="text-red-500">{errors.contentStandards.message}</p>}
      </div>

      {/* Learning Indicators Field */}
      <div>
        <Label htmlFor="learningIndicators">Learning Indicators</Label>
        <Input
          id="learningIndicators"
          {...register("learningIndicators", { required: "Learning indicators are required" })}
        />
        {errors.learningIndicators && <p className="text-red-500">{errors.learningIndicators.message}</p>}
      </div>

      {/* Submit Button */}
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default CurriculumForm;
