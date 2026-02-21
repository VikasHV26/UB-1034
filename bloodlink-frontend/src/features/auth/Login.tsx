import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState("patient");

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const response = await API.post("/auth/google-login", {
        token: credentialResponse.credential,
        role: role
      });

      login(response.data.access_token, response.data.role);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6 text-red-600">
          BloodLink Login
        </h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded mb-6"
        >
          <option value="patient">Patient</option>
          <option value="hospital">Hospital</option>
          <option value="bloodbank">Blood Bank</option>
        </select>

        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert("Google Login Failed")}
        />
      </div>
    </div>
  );
}