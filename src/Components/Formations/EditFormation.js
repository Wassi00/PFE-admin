import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";
import { Alert, Button, Label, Select, TextInput } from "flowbite-react";
import Header from "../Header";

const EditFormations = () => {
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState("");
  const [intitule, setIntitule] = useState("");
  const [departement, setDepartement] = useState("");
  const [departments, setDepartements] = useState([]);
  const [isAlert, setAlert] = useState(false);

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
      setDepartement("");
      setIntitule("");
      setSelectedFormation("");
      setAlert(true);
    } catch (error) {
      console.error("Error updating formation", error);
      alert("Error updating formation");
    }
  };

  return (
    <div>
      <Header />
      <div
        className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
        style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
      >
        {isAlert && (
          <div>
            <Alert
              color="success"
              onDismiss={() => {
                setAlert(false);
              }}
              rounded
            >
              <span className="font-medium">Succès!</span> Formation modifié
              avec succès.
            </Alert>
          </div>
        )}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-white font-bold mb-10">Modifier une Formation</h1>

          <div className="mb-2 block">
            <Label htmlFor="formations" value="Sélectionner une formation" />
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
              <Label htmlFor="intitule" value="Intitulé" />
              <TextInput
                id="intitule"
                type="text"
                value={intitule}
                onChange={(e) => setIntitule(e.target.value)}
                placeholder="Intitulé"
                required
                className="mt-1 mb-5 dark:bg-gray-700 dark:text-gray-200"
              />
              <div className="mb-2 block">
                <Label
                  htmlFor="departements"
                  value="Sélectionner un département"
                />
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

              <Button type="submit">Modifier Formation</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditFormations;
