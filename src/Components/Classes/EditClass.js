import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";

const EditClass = () => {
  const [formations, setFormations] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [modules, setModules] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [assignedProfessors, setAssignedProfessors] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  // Fetch formations on mount
  useEffect(() => {
    const fetchFormations = async () => {
      const response = await axios.get(url + "/formations");
      setFormations(response.data);
    };
    fetchFormations();
  }, []);

  // Fetch classes, modules, and students when a formation is selected
  useEffect(() => {
    if (selectedFormation) {
      const fetchClasses = async () => {
        const response = await axios.get(
          `${url}/classes/formation/${selectedFormation}`
        );
        setClasses(response.data);
      };
      fetchClasses();

      const fetchModules = async () => {
        const response = await axios.get(`${url}/modules/${selectedFormation}`);
        setModules(response.data);
      };
      fetchModules();

      const fetchStudents = async () => {
        const response = await axios.get(
          `${url}/students/${selectedFormation}`
        );
        setStudents(response.data);
      };
      fetchStudents();
    }
  }, [selectedFormation]);

  // Fetch professors on mount
  useEffect(() => {
    const fetchProfessors = async () => {
      const response = await axios.get(url + "/professors");
      setProfessors(response.data);
    };
    fetchProfessors();
  }, []);

  // Fetch class details and assigned professors and students when class is selected
  useEffect(() => {
    if (selectedClass) {
      const fetchClass = async () => {
        const response = await axios.get(`${url}/classes/${selectedClass}`);
        const classData = response.data;
        setCode(classData.code);
        setName(classData.name);
        setSelectedFormation(classData.formationCode);
      };
      fetchClass();

      const fetchAssignedProfessors = async () => {
        const response = await axios.get(
          `${url}/classes/professors/${selectedClass}`
        );
        setAssignedProfessors(response.data);
      };
      fetchAssignedProfessors();

      const fetchAssignedStudents = async () => {
        const response = await axios.get(
          `${url}/classes/students/${selectedClass}`
        );
        console.log(response.data);
        setAssignedStudents(response.data.map((student) => student.studentCin));
      };
      fetchAssignedStudents();
    }
  }, [selectedClass]);

  const handleProfessorChange = (moduleCode, professorCin) => {
    setAssignedProfessors((prevState) => {
      const newState = prevState.filter(
        (prof) => prof.moduleCode !== moduleCode
      );
      newState.push({ moduleCode, professorCin });
      return newState;
    });
  };

  const handleStudentChange = (studentCin) => {
    setAssignedStudents((prevState) => {
      if (prevState.includes(studentCin)) {
        return prevState.filter((cin) => cin !== studentCin);
      } else {
        return [...prevState, studentCin];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(assignedStudents);

    const validSelectedStudents = assignedStudents.filter(
      (cin) => cin !== undefined
    );

    try {
      await axios.put(`${url}/classes/${code}`, {
        code,
        name,
        formationCode: selectedFormation,
        professors: assignedProfessors,
        students: validSelectedStudents,
      });
      alert("Class updated successfully");
    } catch (error) {
      console.error("Error updating class", error);
      alert("Error updating class");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        required
      >
        <option value="">Select Class</option>
        {classes.map((classe) => (
          <option key={classe.code} value={classe.code}>
            {classe.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Class Name"
        required
      />

      <h3>Assign Professors to Modules</h3>
      {modules.map((module) => (
        <div key={module.code}>
          <label>{module.intitule}</label>
          <select
            value={
              assignedProfessors.find((prof) => prof.moduleCode === module.code)
                ?.professorCin || ""
            }
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
              checked={assignedStudents.includes(student.Cin)}
              onChange={() => handleStudentChange(student.Cin)}
            />
            {student.nom} {student.prenom}
          </label>
        </div>
      ))}
      <button type="submit">Update Class</button>
    </form>
  );
};

export default EditClass;
