import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";
import { Button, Label, Select } from "flowbite-react";

const DeleteFormation = () => {
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState("");

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get(url + "/formations");
        setFormations(response.data);
        console.log(formations);
      } catch (error) {
        console.error("Error fetching formations", error);
      }
    };
    fetchFormations();
  }, []);

  const handleDelete = async () => {
    try {
      console.log(selectedFormation);
      await axios.delete(url + `/formations/${selectedFormation}`);
      alert("Formation deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting formation", error);
      alert("Error deleting formation");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="formations" value="Select a formation" />
        </div>
        <Select
          id="formations"
          value={selectedFormation}
          onChange={(e) => setSelectedFormation(e.target.value)}
          required
          className="mb-10"
        >
          {formations.map((formation) => (
            <option key={formation.Code} value={formation.Code}>
              {formation.intitulé}
            </option>
          ))}
        </Select>

        <Button onClick={handleDelete} disabled={!selectedFormation}>
          Delete Formation
        </Button>
      </div>
    </div>
  );
};

export default DeleteFormation;
