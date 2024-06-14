import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../constants";
import "../../App.css";
import { Label, TextInput, Button, Select, Alert } from "flowbite-react";
import Header from "../Header";

const AddFormation = () => {
  const [code, setCode] = useState("");
  const [intitule, setIntitule] = useState("");
  const [departments, setDepartements] = useState([]);
  const [departement, setDepartement] = useState("");
  const [isAlert, setAlert] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(url + `/departments`);
        setDepartements(response.data);
      } catch (error) {
        console.error("Error fetching departments", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url + "/formations", { code, intitule, departement });
      // alert("Formation added successfully");
      setCode("");
      setDepartement("");
      setIntitule("");
      setAlert(true);
    } catch (error) {
      console.error("Error adding formation", error);
      alert("Error adding formation");
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
              <span className="font-medium">Succès!</span> Formation ajouté avec
              succès.
            </Alert>
          </div>
        )}
        <form
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <Label htmlFor="code" value="Code" className="dark:text-gray-200" />
            <TextInput
              id="code"
              type="text"
              placeholder="code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="intitule"
              value="Intitule"
              className="dark:text-gray-200"
            />
            <TextInput
              id="intitule"
              type="text"
              placeholder="intitule"
              required
              value={intitule}
              onChange={(e) => setIntitule(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Sélectionner un département" />
            </div>
            <Select
              id="countries"
              value={departement}
              onChange={(e) => setDepartement(e.target.value)}
              required
            >
              {departments.map((department) => (
                <option key={department.code} value={department.code}>
                  {department.intitule}
                </option>
              ))}
            </Select>
          </div>
          <Button
            className="w-full dark:bg-blue-700 dark:text-gray-200"
            type="submit"
          >
            Ajouter Formation
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddFormation;
