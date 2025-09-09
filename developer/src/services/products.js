import { apiClient } from "./config";

export const apiAddProduct = async (payload) =>
  apiClient.post("/products", payload);

// Fecthing all user adds

export const apiGetAllProducts = async () =>
  apiClient.get("/products/allproducts");

// Fetching all orders

export const apiGetAllOrders = async () => apiClient.get("/orders/allorders");

// Updating Adds

export const apiUpdateProduct = async (id, payload, config) =>
  apiClient.patch(`/products/685d96f64a0b780ba6ac3fb7${id}`, payload, config);

// Getting a single Add

export const apiDeleteVendorProductbyId = async (id) =>
  apiClient.delete(`/products/${id}`);

// Deleting order by Id
export const apiDeleteVendorOrderbyId = async (id, config) =>
  apiClient.delete(`/orders/${id}`, config);
// Creating an Order

export const apiCreateOrder = async (payload) =>
  apiClient.post("/orders", payload);
