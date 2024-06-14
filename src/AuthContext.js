import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import url from "./constants";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token3 = localStorage.getItem("token");
    if (token3) {
      setToken(token3);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, cin) => {
    try {
      const response = await axios.post(url + "/admin/login", {
        emailAcademique: email,
        cin,
      });
      const newToken = response.data;
      setToken(newToken);
      localStorage.setItem("token", newToken);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};
