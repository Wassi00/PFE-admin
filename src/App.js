import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import url from "./constants";
import AdminPanel from "./Components/AdminPanel";
import {
  Button,
  DarkThemeToggle,
  Flowbite,
  Label,
  TextInput,
} from "flowbite-react";

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
      <Flowbite>
        <div
          className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
          style={{ height: "100vh", flexDirection: "column", gap: "2rem" }}
        >
          <DarkThemeToggle />

          <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
            <div className="mb-4">
              <Label
                htmlFor="email"
                value="Email"
                className="dark:text-gray-200"
              />
              <TextInput
                id="email"
                type="email"
                placeholder="name@flowbite.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="cin"
                value="CIN"
                className="dark:text-gray-200"
              />
              <TextInput
                id="cin"
                type="text"
                placeholder="cin"
                required
                value={cin}
                onChange={(e) => setCin(e.target.value)}
                className="mt-1 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <Button
              className="w-full dark:bg-blue-700 dark:text-gray-200"
              onClick={login}
            >
              Login
            </Button>
          </form>
        </div>
      </Flowbite>
    );
  }

  return <AdminPanel />;
};

export default App;
