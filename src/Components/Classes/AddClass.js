// src/components/Classes/AddClass.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";

const AddClass = () => {
  const [formations, setFormations] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [modules, setModules] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState("");
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchFormations = async () => {
      const response = await axios.get(url + "/formations");
      setFormations(response.data);
    };
    // TODO: remove comment
    // fetchFormations();
  }, []);

  useEffect(() => {
    const fetchProfessors = async () => {
      const response = await axios.get(url + "/professors");
      setProfessors(response.data);
    };
    // TODO: remove comment
    // fetchProfessors();
  }, []);

  useEffect(() => {
    if (selectedFormation) {
      const fetchModules = async () => {
        try {
          const response = await axios.get(
            url + `/modules/${selectedFormation}`
          );
          setModules(response.data);
        } catch (error) {
          console.error("Error fetching modules", error);
        }
      };
      fetchModules();
    }
  }, [selectedFormation]);

  useEffect(() => {
    if (selectedFormation) {
      const fetchStudents = async () => {
        const response = await axios.get(
          url + `/students/${selectedFormation}`
        );
        setStudents(response.data);
      };
      fetchStudents();
    }
  }, [selectedFormation]);

  const handleProfessorChange = (moduleCode, professorCin) => {
    setSelectedProfessors((prevState) => {
      const newState = prevState.filter(
        (prof) => prof.moduleCode !== moduleCode
      );
      newState.push({ moduleCode, professorCin });
      return newState;
    });
  };

  const handleStudentChange = (studentCin) => {
    setSelectedStudents((prevState) => {
      if (prevState.includes(studentCin)) {
        return prevState.filter((cin) => cin !== studentCin);
      } else {
        return [...prevState, studentCin];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url + "/classes", {
        code,
        name,
        formationCode: selectedFormation,
        professors: selectedProfessors,
        students: selectedStudents,
      });
      alert("Class added successfully");
      setCode("");
      setName("");
      setSelectedFormation("");
      setSelectedProfessors([]);
      setSelectedStudents([]);
    } catch (error) {
      console.error("Error adding class", error);
      alert("Error adding class");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Class Code"
        required
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Class Name"
        required
      />
      <select
        value={selectedFormation}
        onChange={(e) => setSelectedFormation(e.target.value)}
        required
      >
        <option value="">Select Formation</option>
        {formations.map((formation) => (
          <option key={formation.Code} value={formation.Code}>
            {formation.intitulé}
          </option>
        ))}
      </select>

      <h3>Assign Professors to Modules</h3>
      {modules.map((module) => (
        <div key={module.code}>
          <label>{module.intitule}</label>
          <select
            onChange={(e) => handleProfessorChange(module.code, e.target.value)}
            required
          >
            <option value="">Select Professor</option>
            {professors
              .filter((prof) => prof.departement === module.departement)
              .map((prof) => (
                <option key={prof.Cin} value={prof.Cin}>
                  {prof.nom} {prof.prenom}
                </option>
              ))}
          </select>
        </div>
      ))}

      <h3>Assign Students</h3>
      {students.map((student) => (
        <div key={student.Cin}>
          <label>
            <input
              type="checkbox"
              checked={selectedStudents.includes(student.Cin)}
              onChange={() => handleStudentChange(student.Cin)}
            />
            {student.nom} {student.prenom}
          </label>
        </div>
      ))}
      <button type="submit">Add Class</button>
    </form>
  );
};

export default AddClass;
