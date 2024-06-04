// src/components/Professors/EditProf.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import url from "../../constants";
import { Button, Label, Select, TextInput } from "flowbite-react";

const EditProf = () => {
  const { Cin } = useParams();
  const [professor, setProfessor] = useState({
    nom: "",
    prenom: "",
    spécialité: "",
    departement: "",
    date_de_naissance: "",
    lieu_de_naissance: "",
    adresse_email_academique: "",
    diplome: "",
  });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const response = await axios.get(`${url}/professors/${Cin}`);
        setProfessor(response.data);
      } catch (error) {
        console.error("Error fetching professor:", error);
      }
    };
    fetchProfessor();
  }, [Cin]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${url}/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
      }
    };
    fetchDepartments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfessor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${url}/professors/${Cin}`, professor);
      alert("Professor updated successfully");
      navigate("/professors");
    } catch (error) {
      console.error("Error updating professor:", error);
      alert("Error updating professor");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg overflow-auto">
        <h2 className="text-white font-bold mb-4">Edit Professor</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {/* <label>Nom:</label>
            <input
              type="text"
              name="nom"
              value={professor.nom}
              onChange={handleInputChange}
              required
            /> */}
            <Label htmlFor="nom" value="nom" className="dark:text-gray-200" />
            <TextInput
              id="nom"
              type="text"
              placeholder="nom"
              value={professor.nom}
              onChange={handleInputChange}
              required
              className="mt-1 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            {/* <label>Prénom:</label>
            <input
              type="text"
              name="prenom"
              value={professor.prenom}
              onChange={handleInputChange}
              required
            /> */}

            <Label
              htmlFor="prenom"
              value="prenom"
              className="dark:text-gray-200"
            />
            <TextInput
              id="prenom"
              type="text"
              placeholder="prenom"
              value={professor.prenom}
              onChange={handleInputChange}
              required
              className="mt-1 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            <Label
              htmlFor="specialite"
              value="specialite"
              className="dark:text-gray-200"
            />
            <TextInput
              id="specialite"
              type="text"
              placeholder="specialite"
              value={professor.spécialité}
              onChange={handleInputChange}
              required
              className="mt-1 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            {/* <label>Département:</label>
            <select
              name="departement"
              value={professor.departement}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.code} value={department.code}>
                  {department.intitule}
                </option>
              ))}
            </select> */}
            <div className="mb-2 block">
              <Label htmlFor="departments" value="Select Department" />
            </div>
            <Select
              name="departement"
              value={professor.departement}
              onChange={handleInputChange}
              required
              className="mb-5"
            >
              {departments.map((department) => (
                <option key={department.code} value={department.code}>
                  {department.intitule}
                </option>
              ))}
            </Select>
          </div>
          <div>
            {/* <label>Date de naissance:</label>
            <input
              type="date"
              name="date_de_naissance"
              value={professor.date_de_naissance}
              onChange={handleInputChange}
              required
            /> */}
            <Label
              htmlFor="date de naissance"
              value="date de naissance"
              className="dark:text-gray-200"
            />
            <TextInput
              id="date de naissance"
              type="text"
              placeholder="date de naissance"
              value={professor.date_de_naissance}
              onChange={handleInputChange}
              required
              className="mt-1 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            {/* <label>Lieu de naissance:</label>
            <input
              type="text"
              name="lieu_de_naissance"
              value={professor.lieu_de_naissance}
              onChange={handleInputChange}
              required
            /> */}
            <Label
              htmlFor="lien de naissance"
              value="lien de naissance"
              className="dark:text-gray-200"
            />
            <TextInput
              id="lien de naissance"
              type="text"
              placeholder="lien de naissance"
              value={professor.lieu_de_naissance}
              onChange={handleInputChange}
              required
              className="mt-1 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            {/* <label>Adresse email académique:</label>
            <input
              type="email"
              name="adresse_email_academique"
              value={professor.adresse_email_academique}
              onChange={handleInputChange}
              required
            /> */}
            <Label
              htmlFor="email academique"
              value="email academique"
              className="dark:text-gray-200"
            />
            <TextInput
              id="email academique"
              type="text"
              placeholder="email academique"
              value={professor.adresse_email_academique}
              onChange={handleInputChange}
              required
              className="mt-1 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div className="mb-4">
            {/* <label>Diplôme:</label>
            <input
              type="text"
              name="diplome"
              value={professor.diplome}
              onChange={handleInputChange}
              required
            /> */}
            <Label
              htmlFor="diplome"
              value="diplome"
              className="dark:text-gray-200"
            />
            <TextInput
              id="diplome"
              type="text"
              placeholder="diplome"
              value={professor.diplome}
              onChange={handleInputChange}
              required
              className="mt-1 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <Button type="submit">Update Professor</Button>
        </form>
      </div>
    </div>
  );
};

export default EditProf;
