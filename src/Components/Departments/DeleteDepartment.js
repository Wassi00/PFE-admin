// src/components/Departments/DeleteDepartment.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../constants";

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
    <>
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
      <button onClick={handleDelete}>Delete Department</button>
    </>
  );
};

export default DeleteDepartment;
