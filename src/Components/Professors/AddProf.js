// src/components/Professors/AddProf.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "../../constants";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Cin"
        value={profData.Cin}
        onChange={handleChange}
        placeholder="CIN"
        required
      />
      <input
        type="text"
        name="nom"
        value={profData.nom}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="prenom"
        value={profData.prenom}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="text"
        name="spécialité"
        value={profData.spécialité}
        onChange={handleChange}
        placeholder="Specialty"
        required
      />
      <select
        name="departement"
        value={profData.departement}
        onChange={handleChange}
        required
      >
        <option value="">Select Department</option>
        {departments.map((department) => (
          <option key={department.code} value={department.code}>
            {department.intitule}
          </option>
        ))}
      </select>
      <input
        type="date"
        name="date_de_naissance"
        value={profData.date_de_naissance}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lieu_de_naissance"
        value={profData.lieu_de_naissance}
        onChange={handleChange}
        placeholder="Place of Birth"
        required
      />
      <input
        type="email"
        name="adresse_email_academique"
        value={profData.adresse_email_academique}
        onChange={handleChange}
        placeholder="Academic Email"
        required
      />
      <input
        type="text"
        name="diplome"
        value={profData.diplome}
        onChange={handleChange}
        placeholder="Diploma"
        required
      />
      <button type="submit">Add Professor</button>
    </form>
  );
};

export default AddProf;
