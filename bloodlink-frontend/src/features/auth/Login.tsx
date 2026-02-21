import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../services/api";

const roleInfo = {
  patient: { icon: "👤", label: "Patient", desc: "Request blood when needed" },
  hospital: { icon: "🏥", label: "Hospital", desc: "Manage patient requests" },
  bloodbank: { icon: "🩸", label: "Blood Bank", desc: "Manage your inventory" }
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<"patient" | "hospital" | "bloodbank">("patient");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      setError("");
      
      // Send role from local state
      const response = await API.post("/auth/google-login", {
        token: credentialResponse.credential,
        role: role
      });

      // Ensure role from backend is properly typed
      const backendRole = response.data.role;
      const validRoles = ["patient", "hospital", "bloodbank", "admin"];
      
      if (validRoles.includes(backendRole)) {
        login(response.data.access_token, backendRole as "patient" | "hospital" | "bloodbank" | "admin");
        navigate("/dashboard");
      } else {
        setError("Invalid role received from server. Please try again.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    setError("Google Login Failed. Make sure your browser allows popups and check your internet connection.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-professional-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="hero-gradient-primary p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-4">🩸</div>
              <h1 className="text-3xl font-bold mb-2">BloodLink</h1>
              <p className="text-red-100 text-sm">Smart Blood Management System</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="alert alert-danger">
                <span className="text-lg">❌</span>
                <span>{error}</span>
              </div>
            )}

            {/* Role Selection */}
            <div className="space-y-3">
              <label className="form-label">Select Your Role</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(roleInfo).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setRole(key as any)}
                    className={`p-4 rounded-xl transition-all border-2 text-center card-hover ${
                      role === key
                        ? "border-red-600 bg-red-50 shadow-professional"
                        : "border-gray-200 bg-gray-50 hover:border-red-300"
                    }`}
                  >
                    <div className="text-4xl mb-2">{info.icon}</div>
                    <p className="font-bold text-sm text-gray-900">{info.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Role Description */}
            <div className="bg-gradient-to-r from-red-50 to-red-50 border border-red-200 rounded-xl p-4 text-center transition-all card-hover">
              <p className="text-sm text-gray-600">
                <span className="text-4xl block mb-2">{roleInfo[role].icon}</span>
                <span className="font-semibold text-red-600 block">{roleInfo[role].label}</span>
                <span className="block text-xs text-gray-500 mt-1">{roleInfo[role].desc}</span>
              </p>
            </div>

            {/* Google Login */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500 font-medium">Sign in with Google</span>
                </div>
              </div>
              <div className={`flex justify-center ${loading ? "opacity-50 pointer-events-none" : ""}`}>
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleError}
                />
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-6">
                <div className="inline-block animate-spin">
                  <div className="text-4xl mb-3">⏳</div>
                </div>
                <p className="text-sm text-gray-600 font-medium">Authenticating...</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 px-8 py-4 text-center text-xs text-gray-600">
            <p>🔒 Your data is secure and encrypted</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-red-600 font-semibold hover:text-red-700 transition-colors underline-animation"
          >
            ← Back to Home
          </button>
        </div>

        {/* Support Link */}
        <div className="text-center mt-4 text-sm text-gray-600">
          <p>Need help? <a href="#" className="text-red-600 font-semibold hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
}