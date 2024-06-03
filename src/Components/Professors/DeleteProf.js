// src/components/Professors/DeleteProf.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import url from "../../constants";

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
      <h2>Delete Professor</h2>
      <p>Are you sure you want to delete the following professor?</p>
      <p>
        <strong>Cin:</strong> {professor.Cin}
      </p>
      <p>
        <strong>Nom:</strong> {professor.nom}
      </p>
      <p>
        <strong>Prénom:</strong> {professor.prenom}
      </p>
      <button onClick={handleDelete}>Delete Professor</button>
    </div>
  );
};

export default DeleteProf;
