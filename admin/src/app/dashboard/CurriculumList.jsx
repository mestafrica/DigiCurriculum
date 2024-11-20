import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  FileDown,
  Filter,
  ArrowUpDown,
  AlertCircle,
  Loader2,
  BookOpen,
  Code,
  Save,
  X,
} from "lucide-react";
import { format } from "date-fns";
import {
  apiDeleteCurriculum,
  apiGetCurriculum,
  apiGetCurriculumDetails,
  apiUpdateCurriculum,
} from "@/services/admin";

// Skeleton Component for Loading State
const TableSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center space-x-4 p-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
        <div className="flex space-x-2">
          {[1, 2, 3].map((j) => (
            <div
              key={j}
              className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

// EditCurriculumDialog Component
const EditCurriculumDialog = ({ curriculum, isOpen, onClose, onSave }) => {
  const [editedCurriculum, setEditedCurriculum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (curriculum) {
      setEditedCurriculum({ ...curriculum });
    }
  }, [curriculum]);

  if (!curriculum || !editedCurriculum) return null;

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Make API call to update curriculum
      const response = await fetch(`/api/curriculum/${editedCurriculum._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCurriculum),
      });

      if (!response.ok) throw new Error("Failed to update curriculum");

      const updatedCurriculum = await response.json();
      onSave(updatedCurriculum);
      onClose();
    } catch (err) {
      setError("Failed to update curriculum. Please try again.");
      console.error("Error updating curriculum:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Edit Curriculum</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {error && (
          <Alert className="mb-4 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={editedCurriculum.name}
                onChange={(e) =>
                  setEditedCurriculum({
                    ...editedCurriculum,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Grade</label>
              <Input
                type="number"
                value={editedCurriculum.grade}
                onChange={(e) =>
                  setEditedCurriculum({
                    ...editedCurriculum,
                    grade: parseInt(e.target.value) || "",
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Code</label>
            <Input
              value={editedCurriculum.code}
              onChange={(e) =>
                setEditedCurriculum({
                  ...editedCurriculum,
                  code: e.target.value,
                })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CurriculumList = () => {
  const [curriculumData, setCurriculumData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "grade",
    direction: "asc",
  });
  const [filterGrade, setFilterGrade] = useState("all");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurriculumData();
  }, []);

  const fetchCurriculumData = async () => {
    try {
      setIsLoading(true);
      const response = await apiGetCurriculum();
      setCurriculumData(response.curriculums);
      setError(null);
    } catch (err) {
      setError("Failed to load curriculum data. Please try again later.");
      console.error("Error fetching curriculum:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const sortedAndFilteredData = () => {
    let filteredData = [...curriculumData];

    if (searchQuery) {
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.grade.toString().includes(searchQuery)
      );
    }

    if (filterGrade !== "all") {
      filteredData = filteredData.filter(
        (item) => item.grade === parseInt(filterGrade)
      );
    }

    return filteredData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  };

  const handleDelete = async () => {
    try {
      await apiDeleteCurriculum(selectedCurriculum.id);
      setCurriculumData((prev) =>
        prev.filter((item) => item._id !== selectedCurriculum._id)
      );
      setShowDeleteDialog(false);
      setError({ type: "success", message: "Curriculum deleted successfully" });
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      setError("Failed to delete curriculum. Please try again.");
      console.error("Error deleting curriculum:", err);
    }
  };

  const handleEditSave = (updatedCurriculum) => {
    setCurriculumData((prev) =>
      prev.map((item) =>
        item._id === updatedCurriculum._id ? updatedCurriculum : item
      )
    );
    setError({ type: "success", message: "Curriculum updated successfully" });
    setTimeout(() => setError(null), 3000);
  };

  const handleExport = (curriculum) => {
    const exportData = {
      ...curriculum,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `curriculum-${curriculum.code}-${format(
      new Date(),
      "yyyy-MM-dd"
    )}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Curriculum Management
              </CardTitle>
              <CardDescription>
                Manage and organize your educational curricula efficiently
              </CardDescription>
            </div>
            <Button
              onClick={() => navigate("/admin-dashboard/curriculum")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Curriculum
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert
              className={`mb-4 ${
                error.type === "success" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error.message || error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name, code or grade..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 border rounded-md"
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
              >
                <option value="all">All Grades</option>
                {Array.from(new Set(curriculumData.map((item) => item.grade)))
                  .sort()
                  .map((grade) => (
                    <option key={grade} value={grade}>
                      Grade {grade}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      onClick={() => handleSort("grade")}
                      className="cursor-pointer w-[100px]"
                    >
                      <div className="flex items-center">
                        Grade
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("code")}
                      className="cursor-pointer w-[150px]"
                    >
                      <div className="flex items-center">
                        Code
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("name")}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center">
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="w-[100px]">Strands</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAndFilteredData().length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-32">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <AlertCircle className="h-8 w-8 mb-2" />
                          <p>No curricula found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedAndFilteredData().map((curriculum) => (
                      <TableRow key={curriculum._id}>
                        <TableCell>
                          <Badge variant="outline">
                            Grade {curriculum.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <code className="px-2 py-1 bg-gray-100 rounded">
                            {curriculum.code}
                          </code>
                        </TableCell>
                        <TableCell>{curriculum.name}</TableCell>
                        <TableCell>
                          <Badge className="bg-gray-300">
                            <div className="flex gap-3 text-xs w-full text-black">
                              {curriculum.strands.length} strands
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                navigate(
                                  `/admin-dashboard/curriculum/${curriculum.grade}`
                                )
                              }
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedCurriculum(curriculum);
                                setShowEditDialog(true);
                              }}
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedCurriculum(curriculum);
                                setShowDeleteDialog(true);
                              }}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleExport(curriculum)}
                              title="Export"
                            >
                              <FileDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Curriculum</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedCurriculum?.name}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <EditCurriculumDialog
        curriculum={selectedCurriculum}
        isOpen={showEditDialog}
        onClose={() => {
          setShowEditDialog(false);
          setSelectedCurriculum(null);
        }}
        onSave={handleEditSave}
      />
    </div>
  );
};

export default CurriculumList;
