import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";
import { Button, Label, Select, TextInput } from "flowbite-react";

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
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-white font-bold mb-10">Edit Formations</h1>

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

        {selectedFormation && (
          <form onSubmit={handleUpdateFormation}>
            <TextInput
              type="text"
              value={intitule}
              onChange={(e) => setIntitule(e.target.value)}
              placeholder="Intitule"
              required
              className="mt-1 mb-5 dark:bg-gray-700 dark:text-gray-200"
            />
            <div className="mb-2 block">
              <Label htmlFor="departements" value="Select a department" />
            </div>
            <Select
              id="departements"
              value={departement}
              onChange={(e) => setDepartement(e.target.value)}
              required
              className="mb-5"
            >
              {departments.map((department) => (
                <option key={department.code} value={department.code}>
                  {department.intitule}
                </option>
              ))}
            </Select>

            <Button type="submit">Update Formation</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditFormations;
