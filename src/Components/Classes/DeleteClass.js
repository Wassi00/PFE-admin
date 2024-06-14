import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../constants";
import { Button, Label, Select } from "flowbite-react";
import Header from "../Header";

const DeleteClass = () => {
  const [classes, setClasses] = useState([]);
  const [formations, setFormations] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedFormation, setSelectedFormation] = useState("");

  // Fetch formations on mount
  useEffect(() => {
    const fetchFormations = async () => {
      const response = await axios.get(url + "/formations");
      setFormations(response.data);
    };
    fetchFormations();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axios.get(
        `${url}/classes/formation/${selectedFormation}`
      );
      setClasses(response.data);
    };
    if (selectedFormation) {
      fetchClasses();
    }
  }, [selectedFormation]);

  const handleDelete = async () => {
    try {
      await axios.delete(url + `/classes/${selectedClass}`);
      alert("Class deleted successfully");
    } catch (error) {
      console.error("Error deleting class", error);
      alert("Error deleting class");
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
          <h2 className="text-white font-bold mb-4">Delete Class</h2>

          <div className="mb-2 block">
            <Label htmlFor="formations" value="Select a formation" />
          </div>
          <Select
            id="formations"
            value={selectedFormation}
            onChange={(e) => setSelectedFormation(e.target.value)}
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
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map((classe) => (
            <option key={classe.code} value={classe.code}>
              {classe.name}
            </option>
          ))}
        </select> */}

          <div className="mb-2 block">
            <Label htmlFor="classes" value="Select Class" />
          </div>
          <Select
            id="classes"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            required
            className="mb-5"
          >
            {classes.map((classe) => (
              <option key={classe.code} value={classe.code}>
                {classe.name}
              </option>
            ))}
          </Select>

          <Button onClick={handleDelete} disabled={!selectedClass}>
            Delete Class
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClass;
