// src/components/Departments/EditDepartment.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";
import { Button, Label, Select, TextInput } from "flowbite-react";

const EditDepartment = () => {
  const [intitule, setIntitule] = useState("");
  const [departments, setDepartements] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(url + `/departments`);
        setDepartements(response.data);
      } catch (error) {
        console.error("Error fetching departments", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(url + `/departments/${selectedDepartment}`, {
        intitule,
      });
      alert("Department updated successfully");
    } catch (error) {
      console.error("Error updating department", error);
      alert("Error updating department");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-white font-bold mb-10">Edit Department</h1>
        {/* <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">Select a department</option>
          {departments.map((department) => (
            <option key={department.code} value={department.code}>
              {department.intitule}
            </option>
          ))}
        </select> */}

        <div className="mb-2 block">
          <Label htmlFor="departments" value="Select a Department" />
        </div>
        <Select
          id="departments"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          required
          className="mb-5"
        >
          {departments.map((department) => (
            <option key={department.code} value={department.code}>
              {department.intitule}
            </option>
          ))}
        </Select>

        <form onSubmit={handleSubmit}>
          {/* <input
            type="text"
            value={intitule}
            onChange={(e) => setIntitule(e.target.value)}
            placeholder="Intitule"
            required
          /> */}

          <TextInput
            type="text"
            value={intitule}
            onChange={(e) => setIntitule(e.target.value)}
            placeholder="Intitule"
            required
            className="mt-1 mb-5 dark:bg-gray-700 dark:text-gray-200"
          />
          <Button type="submit">Update Department</Button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
