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

  const fetchRequests = async () => {
    const res = await API.get("/hospital/requests");
    setRequests(res.data);
  };

  const updateStatus = async (id: number, status: string) => {
    await API.put(`/hospital/requests/${id}?status=${status}`);
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🏥 Hospital Dashboard</h1>
        <p className="text-gray-600">Manage blood requests from patients</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="card-elevated">
          <div className="card-body">
            <p className="text-sm text-gray-600 font-medium mb-1">Total Requests</p>
            <p className="text-3xl font-bold text-red-600">{requests.length}</p>
          </div>
        </div>
        <div className="card-elevated">
          <div className="card-body">
            <p className="text-sm text-gray-600 font-medium mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {requests.filter(r => r.status === "pending").length}
            </p>
          </div>
        </div>
        <div className="card-elevated">
          <div className="card-body">
            <p className="text-sm text-gray-600 font-medium mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-600">
              {requests.filter(r => r.status === "approved").length}
            </p>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Blood Requests</h2>
        {requests.length === 0 ? (
          <div className="card">
            <div className="card-body text-center py-12">
              <p className="text-gray-500 text-lg">No blood requests available at the moment</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {requests.map((req) => (
              <div
                key={req.id}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="card-body">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-blue-100 rounded-lg p-2">
                          <span className="text-xl">👤</span>
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">
                            {req.patient_name}
                          </h2>
                          <p className="text-sm text-gray-600">Patient Request</p>
                        </div>
                      </div>

                      <div className="ml-12 mt-3 space-y-1">
                        <p className="text-gray-700">
                          <span className="font-semibold">Blood Group:</span> {req.blood_group}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Units Required:</span> {req.units_required} units
                        </p>
                        <span
                          className={`inline-block mt-3 badge ${
                            req.status === "approved"
                              ? "badge-success"
                              : req.status === "rejected"
                              ? "badge-danger"
                              : "badge-warning"
                          }`}
                        >
                          {req.status || "pending"}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(req.id, "approved")}
                        className="btn btn-success btn-sm"
                      >
                        ✓ Approve
                      </button>

                      <button
                        onClick={() => updateStatus(req.id, "rejected")}
                        className="btn btn-danger btn-sm"
                      >
                        ✗ Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}