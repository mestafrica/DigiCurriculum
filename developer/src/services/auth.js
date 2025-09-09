import { apiClient } from "./config";

export const developerSignin = async (payload) => {
  return apiClient.post("/admin/register", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const apiLogin = async (payload) =>
  apiClient.post("/admin/login", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
