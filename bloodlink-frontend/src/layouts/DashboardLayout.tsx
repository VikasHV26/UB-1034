import { useAuth } from "../context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { role, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-red-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">BloodLink</h1>

        <div className="space-y-4">
          <p className="font-semibold capitalize">{role} Panel</p>
          <button
            onClick={logout}
            className="mt-10 bg-white text-red-600 px-4 py-2 rounded-lg w-full"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
}