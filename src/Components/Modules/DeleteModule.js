import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";

const DeleteModule = () => {
  const [modules, setModules] = useState([]);
  const [selectedModuleCode, setSelectedModuleCode] = useState("");
  const [formations, setFormations] = useState([]);
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
    fetchFormations();
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

  const handleDelete = async () => {
    try {
      await axios.delete(
        url + `/modules/${formationCode}/${selectedModuleCode}`
      );
      alert("Module deleted successfully");
      // Refresh the list of modules after deletion
      const response = await axios.get(url + `/modules/${formationCode}`);
      setModules(response.data);
      setSelectedModuleCode("");
    } catch (error) {
      console.error("Error deleting module", error);
      alert("Error deleting module");
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

      <button onClick={handleDelete} disabled={!selectedModuleCode}>
        Delete Module
      </button>
    </div>
  );
};

export default DeleteModule;
