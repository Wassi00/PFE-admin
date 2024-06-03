// src/components/Professors/EditProf.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import url from "../../constants";

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
    <div>
      <h2>Edit Professor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            name="nom"
            value={professor.nom}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            name="prenom"
            value={professor.prenom}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Spécialité:</label>
          <input
            type="text"
            name="spécialité"
            value={professor.spécialité}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Département:</label>
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
          </select>
        </div>
        <div>
          <label>Date de naissance:</label>
          <input
            type="date"
            name="date_de_naissance"
            value={professor.date_de_naissance}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Lieu de naissance:</label>
          <input
            type="text"
            name="lieu_de_naissance"
            value={professor.lieu_de_naissance}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Adresse email académique:</label>
          <input
            type="email"
            name="adresse_email_academique"
            value={professor.adresse_email_academique}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Diplôme:</label>
          <input
            type="text"
            name="diplome"
            value={professor.diplome}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Professor</button>
      </form>
    </div>
  );
};

export default EditProf;
