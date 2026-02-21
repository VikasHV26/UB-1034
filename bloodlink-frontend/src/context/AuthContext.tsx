import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Role = "patient" | "hospital" | "bloodbank" | null;

interface AuthContextType {
  role: Role;
  token: string | null;
  login: (token: string, role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [token, setToken] = useState<string | null>(null);

  // 🔥 Restore token from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role") as Role;

    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  const login = (token: string, role: Role) => {
    setToken(token);
    setRole(role);

    localStorage.setItem("token", token);
    localStorage.setItem("role", role || "");
  };

  const logout = () => {
    setToken(null);
    setRole(null);

    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}