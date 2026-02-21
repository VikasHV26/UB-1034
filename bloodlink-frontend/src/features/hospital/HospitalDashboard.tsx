import { useEffect, useState } from "react";
import API from "../../services/api";

interface Request {
  id: number;
  patient_name: string;
  blood_group: string;
  units_required: number;
  status: string;
}

export default function HospitalDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/hospital/requests");
      setRequests(res.data);
    } catch (error) {
      alert("Failed to load requests");
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      setLoading(true);
      await API.put(`/hospital/requests/${id}?status=${status}`);
      alert(`Request ${status} successfully`);
      fetchRequests();
    } catch (error: any) {
      alert(error.response?.data?.detail || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Hospital Dashboard</h1>

      {requests.length === 0 ? (
        <p>No patient requests found.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{req.patient_name}</p>
                  <p>
                    {req.blood_group} • {req.units_required} Units
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {req.status}
                  </p>
                </div>

                {req.status === "pending" && (
                  <div className="space-x-2">
                    <button
                      disabled={loading}
                      onClick={() => updateStatus(req.id, "approved")}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      disabled={loading}
                      onClick={() => updateStatus(req.id, "rejected")}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}