// src/components/Departments/DeleteDepartment.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../constants";
import { Button, Label, Select } from "flowbite-react";

const DeleteDepartment = () => {
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

  const handleDelete = async () => {
    try {
      await axios.delete(url + `/departments/${selectedDepartment}`);
      alert("Department deleted successfully");
    } catch (error) {
      console.error("Error deleting department", error);
      alert("Error deleting department");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-white font-bold mb-10">Delete Department</h1>
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
          className="mb-10"
        >
          {departments.map((department) => (
            <option key={department.code} value={department.code}>
              {department.intitule}
            </option>
          ))}
        </Select>

        <Button onClick={handleDelete}>Delete Department</Button>
      </div>
    </div>
  );
};

export default DeleteDepartment;
