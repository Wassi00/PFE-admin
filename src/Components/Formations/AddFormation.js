import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../constants";

const AddFormation = () => {
  const [code, setCode] = useState("");
  const [intitule, setIntitule] = useState("");
  const [departments, setDepartements] = useState([]);
  const [departement, setDepartement] = useState("");

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
      await axios.post(url + "/formations", { code, intitule, departement });
      alert("Formation added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error adding formation", error);
      alert("Error adding formation");
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
      <select
        value={departement}
        onChange={(e) => setDepartement(e.target.value)}
      >
        <option value="">Select a department</option>
        {departments.map((department) => (
          <option key={department.code} value={department.code}>
            {department.intitule}
          </option>
        ))}
      </select>
      <button type="submit">Add Formation</button>
    </form>
  );
};

export default AddFormation;
