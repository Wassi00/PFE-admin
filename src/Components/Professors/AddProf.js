// src/components/Professors/AddProf.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "../../constants";
import { TextInput, Select, Button } from "flowbite-react";

const AddProf = () => {
  const [departments, setDepartments] = useState([]);
  const [profData, setProfData] = useState({
    Cin: "",
    nom: "",
    prenom: "",
    spécialité: "",
    departement: "",
    date_de_naissance: "",
    lieu_de_naissance: "",
    adresse_email_academique: "",
    diplome: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await axios.get(`${url}/departments`);
      setDepartments(response.data);
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setProfData({ ...profData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/professors`, profData);
      alert("Professor added successfully");
      navigate("/professors");
    } catch (error) {
      console.error("Error adding professor:", error);
      alert("Error adding professor");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg overflow-auto"
      >
        <h1 className="text-white font-bold mb-5">Add Professor</h1>
        {/* CIN */}
        <TextInput
          name="Cin"
          placeholder="CIN"
          value={profData.Cin}
          onChange={handleChange}
          required
          className="mb-4"
        />

        {/* Name & Last Name */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextInput
            name="nom"
            placeholder="First Name"
            value={profData.nom}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <TextInput
            name="prenom"
            placeholder="Last Name"
            value={profData.prenom}
            onChange={handleChange}
            required
            className="mb-4"
          />
        </div>

        {/* Specialty */}
        <TextInput
          name="spécialité"
          placeholder="Specialty"
          value={profData.spécialité}
          onChange={handleChange}
          required
          className="mb-4"
        />

        {/* Department */}
        <Select
          name="departement"
          placeholder="Department"
          value={profData.departement}
          onChange={handleChange}
          required
          className="mb-4"
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department.code} value={department.code}>
              {department.intitule}
            </option>
          ))}
        </Select>

        {/* Birthdate */}
        <TextInput
          type="date"
          name="date_de_naissance"
          placeholder="Birthdate"
          value={profData.date_de_naissance}
          onChange={handleChange}
          required
          className="mb-4"
        />

        {/* Place of Birth */}
        <TextInput
          name="lieu_de_naissance"
          placeholder="Place of Birth"
          value={profData.lieu_de_naissance}
          onChange={handleChange}
          required
          className="mb-4"
        />

        {/* Academic Email */}
        <TextInput
          type="email"
          name="adresse_email_academique"
          placeholder="Academic Email"
          value={profData.adresse_email_academique}
          onChange={handleChange}
          required
          className="mb-4"
        />

        {/* Diploma */}
        <TextInput
          name="diplome"
          placeholder="Diploma"
          value={profData.diplome}
          onChange={handleChange}
          required
          className="mb-4"
        />

        {/* Submit Button */}
        <Button type="submit">Add Professor</Button>
      </form>
    </div>
  );
};

export default AddProf;
