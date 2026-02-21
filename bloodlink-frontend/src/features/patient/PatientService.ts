import API from "../../services/api";

export const createRequest = async (data: {
  blood_group: string;
  units_required: number;
  request_type: string;
  latitude: number;
  longitude: number;
}) => {
  const response = await API.post("/requests/create", data);
  return response.data;
};

export const getMyRequests = async () => {
  const response = await API.get("/patient/requests");
  return response.data;
};