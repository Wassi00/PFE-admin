import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";
import { Button, Label, Select } from "flowbite-react";
import Header from "../Header";

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
      <Header />
      <div
        className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
        style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          {" "}
          <div className="mb-2 block">
            <Label htmlFor="formations" value="Select Formation" />
          </div>
          <Select
            id="formations"
            onChange={(e) => onSelect(e.target.value)}
            required
            className="mb-5"
          >
            {formations.map((formation) => (
              <option key={formation.Code} value={formation.Code}>
                {formation.intitulé}
              </option>
            ))}
          </Select>
          {/* <select
        value={selectedModuleCode}
        onChange={(e) => setSelectedModuleCode(e.target.value)}
      >
        <option value="">Select Module</option>
        {modules.map((module) => (
          <option key={module.code} value={module.code}>
            {module.intitule}
          </option>
        ))}
      </select> */}
          <div className="mb-2 block">
            <Label htmlFor="modules" value="Select Module" />
          </div>
          <Select
            id="modules"
            value={selectedModuleCode}
            onChange={(e) => setSelectedModuleCode(e.target.value)}
            required
            className="mb-5"
          >
            {modules.map((module) => (
              <option key={module.code} value={module.code}>
                {module.intitule}
              </option>
            ))}
          </Select>
          <Button onClick={handleDelete} disabled={!selectedModuleCode}>
            Delete Module
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModule;
