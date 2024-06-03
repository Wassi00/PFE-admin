import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../constants";

const AddModule = () => {
  const [code, setCode] = useState("");
  const [intitule, setIntitule] = useState("");
  const [departement, setDepartement] = useState("");
  const [semester, setSemester] = useState("");
  const [formations, setFormations] = useState([]);
  const [departments, setDepartements] = useState([]);
  const [formationCode, setFormationCode] = useState("");

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get(url + "/formations");
        setFormations(response.data);
      } catch (error) {
        console.error("Error fetching formations", error);
      }
    };
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(url + `/departments`);
        setDepartements(response.data);
      } catch (error) {
        console.error("Error fetching departments", error);
      }
    };
    fetchFormations();
    fetchDepartments();
  }, []);

  function onSelect(code) {
    setFormationCode(code);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(intitule);
    try {
      await axios.post(url + `/modules/${formationCode}`, {
        code,
        intitule,
        departement,
        semester,
      });
      alert("Module added successfully");
    } catch (error) {
      console.error("Error adding module", error);
      alert("Error adding module");
    }
  };

  return (
    <div>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select Formation</option>
        {formations.map((formation) => (
          <option key={formation.Code} value={formation.Code}>
            {formation.intitulé}
          </option>
        ))}
      </select>
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
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
        >
          <option value="">Select Semester</option>
          <option value="S1">S1</option>
          <option value="S2">S2</option>
          <option value="S3">S3</option>
          <option value="S4">S4</option>
          <option value="S5">S5</option>
          <option value="S6">S6</option>
        </select>
        <button type="submit">Add Module</button>
      </form>
    </div>
  );
};

export default AddModule;
