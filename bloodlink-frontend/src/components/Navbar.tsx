import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { role, logout } = useAuth();

  return (
    <div className="bg-red-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">BloodLink</h1>
      <div className="flex gap-4">
        <span>{role}</span>
        <button
          onClick={logout}
          className="bg-white text-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}