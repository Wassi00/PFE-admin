// src/components/Students/EditStudent.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import url from "../../constants";

const EditStudent = () => {
  const { Cin } = useParams();
  const [formations, setFormations] = useState([]);
  const [studentData, setStudentData] = useState({
    Cin: "",
    Cne: "",
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    lieuDeNaissance: "",
    adresseEmailAcademique: "",
    formationCode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormations = async () => {
      const response = await axios.get(`${url}/formations`);
      setFormations(response.data);
    };
    fetchFormations();

    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${url}/students/Cin/${Cin}`);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student:", error);
        alert("Error fetching student");
      }
    };
    fetchStudent();
  }, [Cin]);

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${url}/students/${Cin}`, studentData);
      alert("Student updated successfully");
      navigate("/students");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Cin"
        value={studentData.Cin}
        onChange={handleChange}
        placeholder="CIN"
        readOnly
        required
      />
      <input
        type="text"
        name="Cne"
        value={studentData.Cne}
        onChange={handleChange}
        placeholder="CNE"
        required
      />
      <input
        type="text"
        name="nom"
        value={studentData.nom}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="prenom"
        value={studentData.prenom}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="date"
        name="dateDeNaissance"
        value={studentData.dateDeNaissance}
        onChange={handleChange}
        placeholder="Date of Birth"
        required
      />
      <input
        type="text"
        name="lieuDeNaissance"
        value={studentData.lieuDeNaissance}
        onChange={handleChange}
        placeholder="Place of Birth"
        required
      />
      <input
        type="email"
        name="adresseEmailAcademique"
        value={studentData.adresseEmailAcademique}
        onChange={handleChange}
        placeholder="Academic Email"
        required
      />
      <select
        name="formationCode"
        value={studentData.formationCode}
        onChange={handleChange}
        required
      >
        <option value="">Select Formation</option>
        {formations.map((formation) => (
          <option key={formation.Code} value={formation.Code}>
            {formation.intitulé}
          </option>
        ))}
      </select>
      <button type="submit">Update Student</button>
    </form>
  );
};

export default EditStudent;
