// src/components/Departments/AddDepartment.js

import React, { useState } from "react";
import axios from "axios";
import url from "../../constants";
import { Button, Label, TextInput } from "flowbite-react";

const AddDepartment = () => {
  const [code, setCode] = useState("");
  const [intitule, setIntitule] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url + "/departments", {
        code,
        intitule,
      });
      alert("Department added successfully");
      setCode("");
      setIntitule("");
    } catch (error) {
      console.error("Error adding department", error);
      alert("Error adding department");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
    >
      <form
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white font-bold mb-10">Add Department</h1>

        {/* <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code"
          required
        /> */}

        <div className="mb-4">
          <Label htmlFor="code" value="Code" className="dark:text-gray-200" />
          <TextInput
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code"
            required
            className="mt-1 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        {/* <input
          type="text"
          value={intitule}
          onChange={(e) => setIntitule(e.target.value)}
          placeholder="Intitule"
          required
        /> */}

        <div className="mb-4">
          <Label
            htmlFor="intitule"
            value="Intitule"
            className="dark:text-gray-200"
          />
          <TextInput
            id="intitule"
            type="text"
            value={intitule}
            onChange={(e) => setIntitule(e.target.value)}
            placeholder="Intitule"
            required
            className="mt-1 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        <Button type="submit">Add Department</Button>
      </form>
    </div>
  );
};

export default AddDepartment;
