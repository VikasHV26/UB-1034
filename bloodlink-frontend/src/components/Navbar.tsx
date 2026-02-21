import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-700 text-white sticky top-0 z-40 shadow-lg border-b-4 border-red-800">
      <div className="flex justify-between items-center px-6 md:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <span className="text-3xl">🩸</span>
          <h1 className="text-2xl md:text-3xl font-bold">BloodLink</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Role Badge */}
          <div className="hidden sm:flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
            <span className="text-2xl">{getRoleIcon()}</span>
            <span className="font-semibold capitalize text-sm md:text-base">{role}</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="btn-secondary text-red-600 font-bold hover:bg-red-50 transition-colors px-4 md:px-6 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}