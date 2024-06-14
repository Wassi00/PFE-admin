import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import {
  Button,
  DarkThemeToggle,
  Flowbite,
  Label,
  TextInput,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(email, cin);
    navigate("/home");
  };

  return (
    <Flowbite>
      <div
        className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
        style={{ height: "100vh", flexDirection: "column", gap: "2rem" }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ width: "12rem", height: "10rem" }}
        />
        <h1>AdminPanel Login</h1>
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
            <Label htmlFor="cin" value="CIN" className="dark:text-gray-200" />
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
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </div>
    </Flowbite>
  );
};

export default Login;
