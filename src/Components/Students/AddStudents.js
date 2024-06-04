// src/components/Students/AddStudent.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "../../constants";
import { TextInput, Select, Button } from "flowbite-react";

const AddStudent = () => {
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
  }, []);

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/students`, studentData);
      alert("Student added successfully");
      navigate("/students");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student");
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
        <h2 className="text-white font-bold mb-4">Add Student</h2>

        {/* CIN (if available, pre-fill for reference) */}
        <TextInput
          name="Cin"
          placeholder="CIN"
          value={studentData.Cin || ""} // Pre-fill if available
          readOnly={true}
          className="mb-4"
        />

        {/* Cne, Name, Last Name */}
        <TextInput
          name="Cne"
          placeholder="CNE"
          value={studentData.Cne || ""} // Pre-fill if available
          onChange={handleChange}
          required
          className="mb-4"
        />
        <TextInput
          name="nom"
          placeholder="First Name"
          value={studentData.nom || ""} // Pre-fill if available
          onChange={handleChange}
          required
          className="mb-4"
        />
        <TextInput
          name="prenom"
          placeholder="Last Name"
          value={studentData.prenom || ""} // Pre-fill if available
          onChange={handleChange}
          required
          className="mb-4"
        />

        {/* Birthdate */}
        <TextInput
          type="date"
          name="dateDeNaissance"
          placeholder="Birthdate"
          onChange={handleChange}
          required
          className="mb-4"
        />

        {/* Place of Birth */}
        <TextInput
          name="lieuDeNaissance"
          placeholder="Place of Birth"
          value={studentData.lieuDeNaissance || ""} // Pre-fill if available
          onChange={handleChange}
          required
          className="mb-4"
        />

        {/* Academic Email */}
        <TextInput
          type="email"
          name="adresseEmailAcademique"
          placeholder="Academic Email"
          onChange={handleChange}
          required
          className="mb-4"
        />

        {/* Formation */}
        <Select
          name="formationCode"
          placeholder="Formation"
          value={studentData.formationCode || ""} // Pre-fill if available
          onChange={handleChange}
          required
          className="mb-4"
        >
          <option value="">Select Formation</option>
          {formations.map((formation) => (
            <option key={formation.Code} value={formation.Code}>
              {formation.intitulé}
            </option>
          ))}
        </Select>

        {/* Submit Button */}
        <Button type="submit">Add Student</Button>
      </form>
    </div>
  );
};

export default AddStudent;
