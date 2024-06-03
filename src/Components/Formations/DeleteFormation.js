import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";

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
    <div>
      <h2>Select Formation to Delete</h2>
      <select
        value={selectedFormation}
        onChange={(e) => setSelectedFormation(e.target.value)}
      >
        <option value="">Select Formation</option>
        {formations.map((formation) => (
          <option key={formation.Code} value={formation.Code}>
            {formation.intitulé}
          </option>
        ))}
      </select>
      <button onClick={handleDelete} disabled={!selectedFormation}>
        Delete Formation
      </button>
    </div>
  );
};

export default DeleteFormation;
