//  Login for Admin
export const apiAdminLogin = async (payload) => {
  return await apiClient.post("admin/login", payload);
};

// Admin Registration
export const apiSignup = async (payload) => {
  return await apiClient.post("/admin/signup", payload);
};