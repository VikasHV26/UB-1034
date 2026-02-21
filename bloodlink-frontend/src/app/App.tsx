import Landing from "../pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../features/auth/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import PatientDashboard from "../features/patient/PatientDashboard";
import HospitalDashboard from "../features/hospital/HospitalDashboard";
import BloodBankDashboard from "../features/bloodbank/BloodBankDashboard";
import AdminDashboard from "../features/admin/AdminDashboard";
function DashboardRouter() {
  const { role } = useAuth();

  if (role === "patient") return <PatientDashboard />;
  if (role === "hospital") return <HospitalDashboard />;
  if (role === "bloodbank") return <BloodBankDashboard />;
  if (role === "admin") return <AdminDashboard />;
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardRouter />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;