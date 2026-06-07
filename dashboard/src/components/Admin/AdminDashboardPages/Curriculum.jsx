import { useState, useEffect } from 'react';
import { 
  Search, Plus, Edit2, Trash2,
  ChevronRight, Filter, AlertCircle, 
  Loader2, X,
  BookOpen, Layers
} from 'lucide-react';
import curriculumService from '../../../services/curriculumService';

const Curriculum = () => {
  const [curricula, setCurricula] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    grade: '',
    category: 'Primary',
    strands: []
  });

  useEffect(() => {
    fetchCurricula();
  }, []);

  const fetchCurricula = async () => {
    try {
      setLoading(true);
      const data = await curriculumService.getCurricula();
      setCurricula(data.curriculums || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch curricula. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (curriculum = null) => {
    if (curriculum) {
      setFormData({
        name: curriculum.name,
        code: curriculum.code,
        grade: curriculum.grade,
        category: curriculum.category || 'Primary',
        strands: curriculum.strands || []
      });
      setSelectedCurriculum(curriculum);
    } else {
      setFormData({
        name: '',
        code: '',
        grade: '',
        category: 'Primary',
        strands: []
      });
      setSelectedCurriculum(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCurriculum) {
        await curriculumService.updateCurriculum(selectedCurriculum.code, formData);
      } else {
        await curriculumService.createCurriculum(formData);
      }
      setIsModalOpen(false);
      fetchCurricula();
    } catch (err) {
      alert(err.error || 'Operation failed');
    }
  };

  const handleDelete = async () => {
    try {
      await curriculumService.deleteCurriculum(selectedCurriculum.code);
      setIsDeleteModalOpen(false);
      fetchCurricula();
    } catch (err) {
      alert(err.error || 'Delete failed');
    }
  };

  const filteredCurricula = curricula.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = filterGrade === 'all' || c.grade.toString() === filterGrade;
    const matchesCategory = filterCategory === 'all' || c.category === filterCategory;
    return matchesSearch && matchesGrade && matchesCategory;
  });

  const uniqueGrades = [...new Set(curricula.map(c => c.grade))].sort((a, b) => a - b);

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Curriculum Management</h1>
          <p className="text-gray-500 mt-1">Manage educational standards and learning frameworks</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-emerald-200"
        >
          <Plus size={20} />
          <span className="font-semibold">New Curriculum</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or code..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <select 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
          >
            <option value="all">All Grades</option>
            {uniqueGrades.map(g => <option key={g} value={g}>{g === 0 ? 'KG' : `Grade ${g}`}</option>)}
          </select>
        </div>
        <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <select 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Kindergarten">Kindergarten</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
          </select>
        </div>
        <div className="flex items-center justify-end">
          <p className="text-sm text-gray-500 font-medium">
            Showing {filteredCurricula.length} items
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="animate-spin text-emerald-500 mb-4" size={40} />
          <p className="text-gray-500 font-medium">Loading curriculum data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-start gap-4">
          <AlertCircle className="text-red-500 shrink-0" size={24} />
          <div>
            <h3 className="text-red-800 font-bold">Error Loading Data</h3>
            <p className="text-red-600 mt-1">{error}</p>
            <button 
              onClick={fetchCurricula}
              className="mt-3 text-sm font-bold text-red-700 underline underline-offset-4 hover:text-red-900"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : filteredCurricula.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 p-12 rounded-3xl text-center">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-gray-400" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No Curricula Found</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            Try adjusting your search filters or create a new curriculum to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCurricula.map((item) => (
            <div 
              key={item._id}
              className="bg-white group rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-2">
                    <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {item.grade === 0 ? 'KG' : `Grade ${item.grade}`}
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedCurriculum(item);
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                <p className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-tighter">{item.code}</p>
                
                <div className="mt-6 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Layers size={14} className="text-emerald-500" />
                      <span>{item.strands?.length || 0} Topics</span>
                    </div>
                  </div>
                  <button 
                    className="text-emerald-600 font-bold flex items-center gap-1 group/btn"
                    onClick={() => {/* Navigate to details */}}
                  >
                    View Details
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedCurriculum ? 'Edit Curriculum' : 'Create New Curriculum'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Curriculum Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Mathematics"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Identification Code</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. MATH-G1"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Grade Level</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 1 (KG = 0)"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                  </select>
                </div>
              </div>

              <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 mb-8 text-center">
                <p className="text-emerald-800 text-sm font-medium">
                  Note: You can add topics and specific learning indicators after creating the basic curriculum structure.
                </p>
              </div>

              <div className="flex items-center justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all"
                >
                  {selectedCurriculum ? 'Update Curriculum' : 'Save Curriculum'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Delete Curriculum?</h2>
              <p className="text-gray-500 mt-2">
                This will permanently delete <span className="font-bold text-gray-900">&quot;{selectedCurriculum?.name}&quot;</span> and all its associated topics. This action cannot be undone.
              </p>
              <div className="flex items-center gap-3 mt-8">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Curriculum;
