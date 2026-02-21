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
    <div>
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>

      {/* Stats Card */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <p className="text-lg font-semibold">Total Requests</p>
        <p className="text-3xl text-red-600 font-bold">
          {requests.length}
        </p>
      </div>

      <CreateRequestForm />

      {/* Requests List */}
      <div className="mt-10 space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-4 rounded-xl shadow-md flex justify-between"
          >
            <div>
              <p className="font-bold">{req.blood_group}</p>
              <p>Units: {req.units_required}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                req.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : req.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {req.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}