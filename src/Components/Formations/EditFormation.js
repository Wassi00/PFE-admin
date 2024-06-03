import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";

const EditFormations = () => {
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState("");
  const [intitule, setIntitule] = useState("");
  const [departement, setDepartement] = useState("");
  const [departments, setDepartements] = useState([]);

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

  useEffect(() => {
    if (selectedFormation) {
      const fetchFormationDetails = async () => {
        try {
          const response = await axios.get(
            url + `/formations/${selectedFormation}`
          );
          setIntitule(response.data.intitulé);
          setDepartement(response.data.departement);
        } catch (error) {
          console.error("Error fetching formation details", error);
        }
      };
      fetchFormationDetails();
    }
  }, [selectedFormation]);

  const handleUpdateFormation = async (e) => {
    e.preventDefault();
    console.log(intitule);
    try {
      await axios.put(url + `/formations/${selectedFormation}`, {
        intitule,
        departement,
      });
      alert("Formation updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating formation", error);
      alert("Error updating formation");
    }
  };

  return (
    <div>
      <h1>Edit Formations</h1>
      <select
        value={selectedFormation}
        onChange={(e) => setSelectedFormation(e.target.value)}
      >
        <option value="">Select a formation</option>
        {formations.map((formation) => (
          <option key={formation.Code} value={formation.Code}>
            {formation.intitulé}
          </option>
        ))}
      </select>

      {selectedFormation && (
        <form onSubmit={handleUpdateFormation}>
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
          <button type="submit">Update Formation</button>
        </form>
      )}
    </div>
  );
};

export default EditFormations;
