import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 text-white flex flex-col">

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">BloodLink</h1>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-red-600 px-5 py-2 rounded-lg font-semibold"
        >
          Login
        </button>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-5xl font-bold mb-6">
          Smart Blood Management System
        </h2>

        <p className="text-lg max-w-2xl mb-8 opacity-90">
          Connecting Patients, Hospitals, and Blood Banks in real-time.
          Fast approvals. Smart inventory management.
          Emergency-ready system for saving lives.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-white text-red-600 px-8 py-3 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition"
        >
          Get Started
        </button>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-sm opacity-80">
        © 2026 BloodLink • Built for National Hackathon
      </div>
    </div>
  );
}