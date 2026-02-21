import API from "../../services/api";

export const getHospitalRequests = async () => {
  const response = await API.get("/hospital/requests");
  return response.data;
};

export const updateRequestStatus = async (
  requestId: number,
  status: string
) => {
  const response = await API.put(
    `/hospital/requests/${requestId}?status=${status}`
  );
  return response.data;
};