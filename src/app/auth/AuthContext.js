"use client"; // This is important in Next.js 13
import React, { createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = async (username, password) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        setUser(data.user);
        router.push("/blogs"); // Redirect to /blogs after login
      } else {
        // Handle login failure (e.g., display error message)
        // Handle login failure
        const errorData = await response.json(); // Lấy thông tin lỗi từ server
        alert(`Đăng nhập thất bại: ${errorData.detail || 'Lỗi không xác định'}`);
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}