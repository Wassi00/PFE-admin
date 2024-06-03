// src/components/Departments/AddDepartment.js

import React, { useState } from "react";
import axios from "axios";
import url from "../../constants";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Code"
        required
      />
      <input
        type="text"
        value={intitule}
        onChange={(e) => setIntitule(e.target.value)}
        placeholder="Intitule"
        required
      />
      <button type="submit">Add Department</button>
    </form>
  );
};

export default AddDepartment;
