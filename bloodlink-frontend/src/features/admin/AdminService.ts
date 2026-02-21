import API from "../../services/api";

export const getStats = async () => {
  const response = await API.get("/admin/stats");
  return response.data;
};