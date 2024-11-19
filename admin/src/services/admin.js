import { apiClient } from "./config";

export const apiPostCurriculum = async (payload) => {
    try {
      const response = await apiClient.post("/curriculum", payload, {
        headers: {
          'Content-Type': 'application/json', // For JSON data
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error posting new curriculum:", error);
      throw error;
    }
  };
  
  export const apiGetCurriculum = async () => {
    try {
      const response = await apiClient.get(`/curriculum`);
      return response.data; // Return the curriculum details
    } catch (error) {
      console.error("Error fetching curriculum:", error);
      throw error;
    }
  };

  export const apiGetCurriculumDetails = async (curriculumId) => {
    try {
      const response = await apiClient.get(`/curriculum/${curriculumId}`);
      return response; // Return the entire response object
    } catch (error) {
      console.error("Error fetching curriculum:", error);
      throw error;
    }
  };
  

  export const apiUpdateCurriculum = async (curriculumId, payload) => {
    try {
      const response = await apiClient.patch(`/curriculum/${curriculumId}`, payload);
      return response.data; // Return the updated curriculum
    } catch (error) {
      console.error("Error updating curriculum:", error);
      throw error;
    }
  };

  
  export const apiDeleteCurriculum = async (curriculumId) => {
    try {
      const response = await apiClient.delete(`/curriculum/${curriculumId}`);
      return response.data; // Return confirmation of deletion
    } catch (error) {
      console.error("Error deleting curriculum:", error);
      throw error;
    }
  };
  
  export const apiGetStatistics = async () => {
    try {
      const response = await apiClient.get('/statistics');
      return response; // Return the entire response object
    } catch (error) {
      console.error("Error fetching statistics:", error);
      throw error;
    }
  };