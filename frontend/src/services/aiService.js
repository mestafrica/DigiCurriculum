import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const aiService = {
  // Curriculum Search (Ask AI)
  askAI: async (query, grade) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/curriculum/search`, {
        params: { query, grade },
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Generate Lesson Plan
  generateLessonPlan: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/generate/lessonplan`, data, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Generate Assessment
  generateAssessment: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/assessments`, data, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get available curricula for dropdowns
  getCurricula: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/curriculum`, {
        params: { limit: 500 }, // Fetch all subjects (90+ in DB)
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  // Ingest Curriculum Document (AI Ingestion)
  ingestCurriculum: async (formData) => {

    try {
      const response = await axios.post(`${API_BASE_URL}/api/ingest`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};


export default aiService;
