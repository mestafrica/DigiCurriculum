import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const adminService = {
  getCurricula: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/curriculum`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getCurriculumDetails: async (grade) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/curriculum/${grade}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createCurriculum: async (curriculumData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/curriculum`, curriculumData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateCurriculum: async (code, curriculumData) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/curriculum/${code}`,
        curriculumData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteCurriculum: async (code) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/curriculum/${code}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default adminService;
