import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getRoleIcon = () => {
    switch (role) {
      case "patient":
        return "👤";
      case "hospital":
        return "🏥";
      case "bloodbank":
        return "🩸";
      case "admin":
        return "👨‍💼";
      default:
        return "🔐";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-red-600 to-red-700 text-white p-6 flex flex-col justify-between shadow-xl">
        <div>
          <h1 className="text-3xl font-bold mb-2">🩸 BloodLink</h1>
          <p className="text-red-100 text-sm mb-8">Blood Management System</p>

          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-red-100 text-sm mb-2">Current Role</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getRoleIcon()}</span>
              <p className="font-bold capitalize text-lg">{role}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn-secondary w-full hover:bg-red-50 text-red-600 font-semibold py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}