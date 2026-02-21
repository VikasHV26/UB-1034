import API from "../../services/api";

export const getInventory = async () => {
  const response = await API.get("/bloodbank/inventory");
  return response.data;
};

export const addInventory = async (data: {
  blood_group: string;
  units_available: number;
}) => {
  const response = await API.post("/bloodbank/inventory", data);
  return response.data;
};

export const deleteInventory = async (id: number) => {
  const response = await API.delete(`/bloodbank/inventory/${id}`);
  return response.data;
};