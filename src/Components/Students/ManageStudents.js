// src/components/Students/ManageStudents.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "../../constants";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [formations, setFormations] = useState([]);
  const [searchCIN, setSearchCIN] = useState("");
  const [selectedFormation, setSelectedFormation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormations = async () => {
      const response = await axios.get(`${url}/formations`);
      setFormations(response.data);
    };
    fetchFormations();
  }, []);

  useEffect(() => {
    if (searchCIN) {
      const fetchStudentByCIN = async () => {
        try {
          const response = await axios.get(`${url}/students/Cin/${searchCIN}`);
          setStudents([response.data]);
        } catch (error) {
          console.error("Error fetching student:", error);
          setStudents([]);
        }
      };
      fetchStudentByCIN();
    } else if (selectedFormation) {
      const fetchStudentsByFormation = async () => {
        try {
          const response = await axios.get(
            `${url}/students/${selectedFormation}`
          );
          setStudents(response.data);
        } catch (error) {
          console.error("Error fetching students by formation:", error);
          setStudents([]);
        }
      };
      fetchStudentsByFormation();
    } else {
      const fetchAllStudents = async () => {
        const response = await axios.get(`${url}/students`);
        setStudents(response.data);
      };
      fetchAllStudents();
    }
  }, [searchCIN, selectedFormation]);

  return (
    <div>
      <button onClick={() => navigate("/students/add")}>Add Student</button>
      <input
        type="text"
        placeholder="Search by CIN"
        value={searchCIN}
        onChange={(e) => setSearchCIN(e.target.value)}
      />
      <select
        value={selectedFormation}
        onChange={(e) => setSelectedFormation(e.target.value)}
      >
        <option value="">Select Formation</option>
        {formations.map((formation) => (
          <option key={formation.Code} value={formation.Code}>
            {formation.intitulé}
          </option>
        ))}
      </select>
      <div>
        {students.map((student) => (
          <div key={student.Cin}>
            <p>
              {student.nom} {student.prenom}
            </p>
            <button onClick={() => navigate(`/students/edit/${student.Cin}`)}>
              Edit
            </button>
            <button onClick={() => navigate(`/students/delete/${student.Cin}`)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStudents;
