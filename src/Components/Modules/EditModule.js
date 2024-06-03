import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";

const EditModule = () => {
  const [modules, setModules] = useState([]);
  const [selectedModuleCode, setSelectedModuleCode] = useState("");
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

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(url + `/modules/${formationCode}`);
        setModules(response.data);
      } catch (error) {
        console.error("Error fetching modules", error);
      }
    };

    if (formationCode) {
      fetchModules();
    }
  }, [formationCode]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(url + `/modules/${formationCode}`);
        setModules(response.data);
      } catch (error) {
        console.error("Error fetching modules", error);
      }
    };

    if (formationCode) {
      fetchModules();
    }
  }, [formationCode]);

  useEffect(() => {
    if (selectedModuleCode) {
      const fetchModule = async () => {
        console.log(selectedModuleCode);
        try {
          const response = await axios.get(
            url + `/modules/module/${selectedModuleCode}`
          );
          setIntitule(response.data.intitule);
          setDepartement(response.data.departement);
          setSemester(response.data.semester);
        } catch (error) {
          console.error("Error fetching module", error);
        }
      };

      fetchModule();
    }
  }, [formationCode, selectedModuleCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(url + `/modules/${formationCode}/${selectedModuleCode}`, {
        intitule,
        departement,
        semester,
      });
      alert("Module updated successfully");
      //updating the lists
      const response = await axios.get(url + `/modules/${formationCode}`);
      setModules(response.data);
    } catch (error) {
      console.error("Error updating module", error);
      alert("Error updating module");
    }
  };

  return (
    <div>
      <h1>Edit module</h1>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select Formation</option>
        {formations.map((formation) => (
          <option key={formation.Code} value={formation.Code}>
            {formation.intitulé}
          </option>
        ))}
      </select>
      <select
        value={selectedModuleCode}
        onChange={(e) => setSelectedModuleCode(e.target.value)}
      >
        <option value="">Select Module</option>
        {modules.map((module) => (
          <option key={module.code} value={module.code}>
            {module.intitule}
          </option>
        ))}
      </select>

      {selectedModuleCode && (
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Update Module</button>
        </form>
      )}
    </div>
  );
};

export default EditModule;
