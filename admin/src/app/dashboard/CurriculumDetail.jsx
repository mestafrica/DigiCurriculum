import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  apiGetCurriculumDetails,
  apiDeleteCurriculum,
  apiUpdateCurriculum,
} from "@/services/admin";
import { toast } from "react-toastify";
import {
  ChevronRight,
  BookOpen,
  Edit3,
  Trash2,
  ArrowLeft,
  Download,
  Printer,
  Share2,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Info,
  BookOpenCheck,
  GraduationCap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

const CurriculumDetail = () => {
  const { curriculumId } = useParams();
  const navigate = useNavigate();
  const [curriculumDetail, setCurriculumDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [expandedStrands, setExpandedStrands] = useState(new Set());
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    code: "",
    grade: "",
  });

  useEffect(() => {
    const fetchCurriculumDetail = async () => {
      try {
        setLoading(true);
        const data = await apiGetCurriculumDetails(curriculumId);
        const curriculum = data.data.curriculums[0];
        setCurriculumDetail(curriculum);
        setEditFormData({
          name: curriculum.name,
          code: curriculum.code,
          grade: curriculum.grade,
        });
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
      } catch (error) {
        setError("Failed to fetch curriculum details. Please try again later.");
        toast.error("Failed to fetch curriculum details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculumDetail();
  }, [curriculumId]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await apiDeleteCurriculum(curriculumId);
      toast.success("Curriculum deleted successfully");
      setDeleteModalOpen(false);
      navigate("/admin-dashboard/curriculum-list");
    } catch (error) {
      toast.error("Failed to delete curriculum");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      setLoading(true);
      await apiUpdateCurriculum(curriculumId, editFormData);
      const updatedData = await apiGetCurriculumDetails(curriculumId);
      setCurriculumDetail(updatedData.data.curriculums[0]);
      toast.success("Curriculum updated successfully");
      setEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update curriculum");
    } finally {
      setLoading(false);
    }
  };

  const toggleStrand = (index) => {
    setExpandedStrands((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const SkeletonLoader = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="border-b">
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-4 py-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-4" />
              </CardHeader>
              <CardContent>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="mb-4">
                    <Skeleton className="h-24 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Breadcrumb and Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Button
              variant="ghost"
              onClick={() => navigate("/admin-dashboard/curriculum-list")}
              className="flex items-center hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Curriculum List
            </Button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="font-medium text-gray-900">
              {curriculumDetail?.name}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Print curriculum details</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Export as PDF</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share curriculum</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {showSuccessAlert && (
          <Alert className="bg-green-50 border-green-200 animate-fadeOut">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription>
              Curriculum details loaded successfully
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center text-lg">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                  Curriculum Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 py-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="font-medium text-gray-900">
                    {curriculumDetail?.name}
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Code</h3>
                  <Badge variant="secondary" className="text-sm">
                    {curriculumDetail?.code}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">
                    Grade Level
                  </h3>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-blue-500" />
                    <Badge className="bg-blue-100 text-blue-800">
                      Grade {curriculumDetail?.grade}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Strands
                  </h3>
                  <div className="flex items-center">
                    <BookOpenCheck className="h-4 w-4 mr-2 text-green-500" />
                    <span className="font-medium">
                      {curriculumDetail?.strands.length} Strands
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button
                    onClick={() => setEditModalOpen(true)}
                    className="w-full justify-center bg-[#A8E8C7]"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Curriculum
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setDeleteModalOpen(true)}
                    className="w-full justify-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Curriculum
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strands Section */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Curriculum Strands
              </h2>

              {curriculumDetail?.strands.map((strand, index) => (
                <Card
                  key={strand.code}
                  className="mb-4 last:mb-0 overflow-hidden"
                >
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleStrand(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <ChevronRight
                          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                            expandedStrands.has(index)
                              ? "transform rotate-90"
                              : ""
                          }`}
                        />
                        <div>
                          <CardTitle className="text-base font-medium">
                            {strand.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {strand.subStrand.length} Sub-strands
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {strand.code}
                      </Badge>
                    </div>
                  </CardHeader>

                  {expandedStrands.has(index) && (
                    <CardContent className="bg-gray-50 border-t">
                      <div className="space-y-4">
                        {strand.subStrand.map((sub) => (
                          <div
                            key={sub.code}
                            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {sub.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Sub-strand Code: {sub.code}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                  <Info className="h-4 w-4 text-blue-500 mr-2" />
                                  <h4 className="font-medium text-gray-900">
                                    Content Standards
                                  </h4>
                                </div>
                                <p className="text-gray-700 text-sm">
                                  {sub.contentStandards}
                                </p>
                              </div>

                              <div>
                                <div className="flex items-center mb-3">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                  <h4 className="font-medium text-gray-900">
                                    Learning Indicators
                                  </h4>
                                </div>
                                <ul className="space-y-2">
                                  {sub.learningIndicators.map(
                                    (indicator, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-start bg-gray-50 p-3 rounded-lg"
                                      >
                                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-green-100 text-green-700 rounded-full text-xs font-medium mr-3">
                                          {idx + 1}
                                        </span>
                                        <span className="text-gray-700 text-sm">
                                          {indicator}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Edit3 className="h-5 w-5 mr-2 text-blue-500" />
              Edit Curriculum
            </DialogTitle>
            <DialogDescription>
              Update the curriculum details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Curriculum Name</Label>
              <Input
                id="name"
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Enter curriculum name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Curriculum Code</Label>
              <Input
                id="code"
                value={editFormData.code}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    code: e.target.value,
                  }))
                }
                placeholder="Enter curriculum code"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="grade">Grade Level</Label>
              <Input
                id="grade"
                value={editFormData.grade}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    grade: e.target.value,
                  }))
                }
                placeholder="Enter grade level"
                type="number"
                min="1"
                max="12"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEdit}
              className="w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              Delete Curriculum
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete this curriculum? This action
              cannot be undone. All associated data, including strands and
              learning indicators, will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">
              You are about to delete:
            </h4>
            <ul className="space-y-2 text-sm text-red-700">
              <li className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Curriculum: {curriculumDetail?.name}
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-2" />
                {curriculumDetail?.strands.length} Strands
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-2" />
                {curriculumDetail?.strands.reduce(
                  (acc, strand) => acc + strand.subStrand.length,
                  0
                )}{" "}
                Sub-strands
              </li>
            </ul>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Curriculum
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scroll to Top Button */}
      <TooltipProvider>
        <div className="fixed bottom-6 right-6">
          <div className="flex flex-col gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10 bg-white shadow-lg hover:bg-gray-50"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <ArrowLeft className="h-4 w-4 rotate-90" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Scroll to top</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .animate-fadeOut {
          animation: fadeOut 0.5s ease-in-out forwards;
          animation-delay: 2.5s;
        }
      `}</style>
    </div>
  );
};

export default CurriculumDetail;
