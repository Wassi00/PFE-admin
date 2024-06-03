import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import url from "./constants";
import AdminPanel from "./Components/AdminPanel";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState("");

  const login = async () => {
    try {
      const response = await axios.post(url + "/admin/login", {
        emailAcademique: email,
        cin,
      });
      setToken(response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Login failed");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <h1>Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="CIN"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return <AdminPanel />;
};

export default App;
