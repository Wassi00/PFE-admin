// src/components/Professors/DeleteProf.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import url from "../../constants";
import { Button } from "flowbite-react";
import Header from "../Header";

const DeleteProf = () => {
  const { Cin } = useParams();
  const [professor, setProfessor] = useState({});
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

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/professors/${Cin}`);
      alert("Professor deleted successfully");
      navigate("/professors");
    } catch (error) {
      console.error("Error deleting professor:", error);
      alert("Error deleting professor");
    }
  };

  return (
    <div>
      <Header />
      <div
        className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
        style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg overflow-auto">
          <h2 class="text-white font-bold text-xl">Delete Professor</h2>
          <p class="mt-2 text-white text-sm sm:inline">
            Are you sure you want to delete the following professor?
          </p>
          <ul class="mt-4 pl-4">
            <li>
              <strong class="font-bold">Cin:</strong>{" "}
              <span class="text-white">{professor.Cin}</span>
            </li>
            <li>
              <strong class="font-bold">Nom:</strong>{" "}
              <span class="text-white">{professor.nom}</span>
            </li>
            <li>
              <strong class="font-bold">Prénom:</strong>{" "}
              <span class="text-white">{professor.prenom}</span>
            </li>
          </ul>
          <Button className="mt-4" onClick={handleDelete}>
            Delete Professor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProf;
