import { useState } from "react";
import { createRequest } from "../PatientService";

export default function CreateRequestForm() {
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [units, setUnits] = useState(1);
  const [requestType, setRequestType] = useState("immediate");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createRequest({
        blood_group: bloodGroup,
        units_required: units,
        request_type: requestType,
        latitude: 12.9716,
        longitude: 77.5946,
      });

      alert("Request created successfully ✅");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md">
      <h2 className="text-xl font-semibold mb-4">Create Blood Request</h2>

      <select
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      >
        <option>A+</option>
        <option>A-</option>
        <option>B+</option>
        <option>B-</option>
        <option>O+</option>
        <option>O-</option>
        <option>AB+</option>
        <option>AB-</option>
      </select>

      <input
        type="number"
        value={units}
        onChange={(e) => setUnits(Number(e.target.value))}
        className="w-full border p-2 rounded mb-3"
      />

      <select
        value={requestType}
        onChange={(e) => setRequestType(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="immediate">Immediate</option>
        <option value="scheduled">Scheduled</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </div>
  );
}