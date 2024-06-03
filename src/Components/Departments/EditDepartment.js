// src/components/Departments/EditDepartment.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";

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
    <div>
      <select
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
      >
        <option value="">Select a department</option>
        {departments.map((department) => (
          <option key={department.code} value={department.code}>
            {department.intitule}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={intitule}
          onChange={(e) => setIntitule(e.target.value)}
          placeholder="Intitule"
          required
        />
        <button type="submit">Update Department</button>
      </form>
    </div>
  );
};

export default EditDepartment;
