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
    <div className="card-elevated max-w-2xl">
      <div className="card-header">
        <h2 className="text-2xl font-bold text-gray-900">🩸 Create Blood Request</h2>
        <p className="text-gray-600 text-sm mt-1">Request blood units quickly and easily</p>
      </div>

      <div className="card-body space-y-5">
        {/* Blood Group */}
        <div className="form-group">
          <label className="form-label">Blood Group *</label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="form-select"
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
        </div>

        {/* Units Required */}
        <div className="form-group">
          <label className="form-label">Units Required *</label>
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(Number(e.target.value))}
            className="form-input"
            min="1"
            max="20"
            placeholder="Enter number of units"
          />
        </div>

        {/* Request Type */}
        <div className="form-group">
          <label className="form-label">Request Type *</label>
          <select
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            className="form-select"
          >
            <option value="immediate">⚡ Immediate (Urgent)</option>
            <option value="scheduled">📅 Scheduled (Planned)</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary w-full btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="inline-block animate-spin mr-2">⏳</span>
              Submitting...
            </>
          ) : (
            "📤 Submit Request"
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Fields marked with * are required
        </p>
      </div>
    </div>
  );
}