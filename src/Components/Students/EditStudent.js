// src/components/Students/EditStudent.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import url from "../../constants";
import { TextInput, Select, Button, Datepicker } from "flowbite-react";

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
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg overflow-auto">
        <h2 className="text-white font-bold mb-4">Edit Student</h2>
        <form onSubmit={handleSubmit}>
          {/* CIN (Read-only) */}
          <TextInput
            name="Cin"
            placeholder="CIN"
            value={studentData.Cin}
            readOnly={true}
            className="mb-4"
          />

          {/* Cne, Name, Last Name */}
          <TextInput
            name="Cne"
            placeholder="CNE"
            value={studentData.Cne}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <TextInput
            name="nom"
            placeholder="First Name"
            value={studentData.nom}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <TextInput
            name="prenom"
            placeholder="Last Name"
            value={studentData.prenom}
            onChange={handleChange}
            required
            className="mb-4"
          />

          {/* Birthdate */}
          <Datepicker
            name="dateDeNaissance"
            placeholder="Birthdate"
            value={new Date(studentData.dateDeNaissance).toLocaleDateString(
              "en-GB",
              { day: "2-digit", month: "2-digit", year: "numeric" }
            )}
            onChange={handleChange}
            required
            className="mb-4"
          />

          {/* Place of Birth */}
          <TextInput
            name="lieuDeNaissance"
            placeholder="Place of Birth"
            value={studentData.lieuDeNaissance}
            onChange={handleChange}
            required
            className="mb-4"
          />

          {/* Academic Email */}
          <TextInput
            type="email"
            name="adresseEmailAcademique"
            placeholder="Academic Email"
            value={studentData.adresseEmailAcademique}
            onChange={handleChange}
            required
            className="mb-4"
          />

          {/* Formation */}
          <Select
            name="formationCode"
            placeholder="Formation"
            value={studentData.formationCode}
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
          <Button type="submit">Update Student</Button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
