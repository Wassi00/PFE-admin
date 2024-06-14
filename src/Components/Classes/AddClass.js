// src/components/Classes/AddClass.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../constants";
import {
  Alert,
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import Header from "../Header";

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
  const [selectAll, setSelectAll] = useState(false);
  const [selectThirty, setSelectThirty] = useState(false);
  const [isAlert, setAlert] = useState(false);

  useEffect(() => {
    const fetchFormations = async () => {
      const response = await axios.get(url + "/formations");
      setFormations(response.data);
    };
    fetchFormations();
  }, []);

  useEffect(() => {
    const fetchProfessors = async () => {
      const response = await axios.get(url + "/professors");
      setProfessors(response.data);
    };
    fetchProfessors();
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

  useEffect(() => {
    if (selectAll) {
      setSelectedStudents(students.map((student) => student.Cin));
    } else {
      setSelectedStudents([]);
    }
  }, [selectAll, students]);

  useEffect(() => {
    if (selectThirty) {
      setSelectedStudents(students.slice(0, 30).map((student) => student.Cin));
    } else if (!selectAll) {
      setSelectedStudents([]);
    }
  }, [selectThirty, students, selectAll]);

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
      setAlert(true);
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
    <div>
      {" "}
      <Header />
      <div
        className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
        style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
      >
        {isAlert && (
          <div>
            <Alert
              color="success"
              onDismiss={() => {
                setAlert(false);
              }}
              rounded
            >
              <span className="font-medium">Succès!</span> Classe ajouté avec
              succès.
            </Alert>
          </div>
        )}
        <form
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md overflow-auto"
          onSubmit={handleSubmit}
        >
          <h1 className="text-white font-bold mb-5">Ajouter une Classe</h1>
          {/* <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Class Code"
          required
        /> */}

          <TextInput
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code Classe"
            required
            className="mt-1 dark:bg-gray-700 dark:text-gray-200"
          />

          {/* <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Class Name"
          required
        /> */}

          <TextInput
            ttype="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de la Classe"
            required
            className="mt-1 dark:bg-gray-700 dark:text-gray-200"
          />

          {/* <select
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
        </select> */}

          <div className="mb-2 block">
            <Label htmlFor="formations" value="Sélectionner une formation" />
          </div>
          <Select
            id="formations"
            value={selectedFormation}
            onChange={(e) => setSelectedFormation(e.target.value)}
            required
            className="mb-5"
          >
            {formations.map((formation) => (
              <option key={formation.Code} value={formation.Code}>
                {formation.intitulé}
              </option>
            ))}
          </Select>

          <h3 className="text-white font-bold mb-5">
            Affecter des professeurs aux modules
          </h3>

          {modules.map((module) => (
            <div key={module.code}>
              {/* <label>{module.intitule}</label>
            <select
              onChange={(e) =>
                handleProfessorChange(module.code, e.target.value)
              }
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
            </select> */}

              <div className="block">
                <Label htmlFor="Professor" value={module.intitule} />
              </div>
              <Select
                id="Professor"
                onChange={(e) =>
                  handleProfessorChange(module.code, e.target.value)
                }
                required
                className="mb-4"
              >
                {professors
                  .filter((prof) => prof.departement === module.departement)
                  .map((prof) => (
                    <option key={prof.Cin} value={prof.Cin}>
                      {prof.nom} {prof.prenom}
                    </option>
                  ))}
              </Select>
            </div>
          ))}
          <h3 className="text-white font-bold mb-3">Affecter les étudiants</h3>
          <div className="mb-2 block">
            <div className="flex items-center gap-2">
              <Checkbox
                id="selectAll"
                checked={selectAll}
                onChange={() => {
                  setSelectAll(!selectAll);
                  setSelectThirty(false);
                }}
              />
              <Label htmlFor="selectAll">Sélectionner tous les étudiants</Label>
            </div>
            {students.length > 30 && (
              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  id="selectThirty"
                  checked={selectThirty}
                  onChange={() => {
                    setSelectThirty(!selectThirty);
                    setSelectAll(false);
                  }}
                />
                <Label htmlFor="selectThirty">
                  Sélectionner les 30 premiers étudiants
                </Label>
              </div>
            )}
          </div>
          {students.map((student) => (
            <div key={student.Cin}>
              <label>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox
                    id="accept"
                    checked={selectedStudents.includes(student.Cin)}
                    onChange={() => handleStudentChange(student.Cin)}
                  />
                  <Label htmlFor="accept" className="flex">
                    {student.nom} {student.prenom}
                  </Label>
                </div>
              </label>
            </div>
          ))}
          <Button type="submit">Ajouter une Classe</Button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
