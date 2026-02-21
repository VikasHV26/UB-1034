import CreateRequestForm from "./components/CreateRequestForm";
import { useEffect, useState } from "react";
import API from "../../services/api";

interface Request {
  id: number;
  blood_group: string;
  units_required: number;
  status: string;
  created_at: string;
}

export default function PatientDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);

  const fetchRequests = async () => {
    const res = await API.get("/patient/requests");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">👤 Patient Dashboard</h1>
        <p className="text-gray-600">Manage your blood requests and track their status</p>
      </div>

      {/* Stats Card */}
      <div className="card-elevated">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Total Requests</p>
              <p className="text-4xl font-bold text-red-600">{requests.length}</p>
            </div>
            <div className="text-5xl opacity-20">📋</div>
          </div>
        </div>
      </div>

      {/* Create Request Form */}
      <div>
        <CreateRequestForm />
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Requests</h2>
        {requests.length === 0 ? (
          <div className="card">
            <div className="card-body text-center py-12">
              <p className="text-gray-500 text-lg">No blood requests yet. Create one to get started!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="card-body flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-100 rounded-lg p-3">
                        <span className="text-2xl">🩸</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{req.blood_group}</p>
                        <p className="text-gray-600">{req.units_required} units requested</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(req.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span
                      className={`badge ${
                        req.status === "approved"
                          ? "badge-success"
                          : req.status === "rejected"
                          ? "badge-danger"
                          : "badge-warning"
                      }`}
                    >
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
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