// src/components/Students/ManageStudents.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "../../constants";
import { Button, Table, TextInput, Select } from "flowbite-react";
import Header from "../Header";

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
      <Header />
      <div
        className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
        style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg overflow-auto">
          <div className="flex items-center mb-4">
            <Select
              value={selectedFormation}
              onChange={(e) => setSelectedFormation(e.target.value)}
              className="mr-2"
            >
              <option value="">Sélectionner une Formation</option>
              {formations.map((formation) => (
                <option key={formation.Code} value={formation.Code}>
                  {formation.intitulé}
                </option>
              ))}
            </Select>
            <TextInput
              type="text"
              placeholder="Chercher par CIN"
              value={searchCIN}
              onChange={(e) => setSearchCIN(e.target.value)}
            />
          </div>
          <p className="text-bold text-white" style={{ marginBottom: "1rem" }}>
            OU
          </p>
          <Button onClick={() => navigate("/students/add")} className="mb-4">
            Ajouter un Etudiant
          </Button>
          <Table>
            <Table.Head>
              <Table.HeadCell>Nom Complet</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Modifier</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Supprimer</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {students.map((student) => (
                <Table.Row
                  key={student.Cin}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    {student.nom} {student.prenom}
                  </Table.Cell>
                  <Table.Cell
                    className="text-yellow-400"
                    onClick={() => navigate(`/students/edit/${student.Cin}`)}
                  >
                    Editer
                  </Table.Cell>
                  <Table.Cell
                    className="text-red-600"
                    onClick={() => navigate(`/students/delete/${student.Cin}`)}
                  >
                    Supprimer
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
