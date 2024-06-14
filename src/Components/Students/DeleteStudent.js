// src/components/Students/DeleteStudent.js

import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import url from "../../constants";
import Header from "../Header";

const DeleteStudent = () => {
  const { Cin } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteStudent = async () => {
      try {
        await axios.delete(`${url}/students/${Cin}`);
        alert("Student deleted successfully");
        navigate("/students");
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Error deleting student");
      }
    };
    deleteStudent();
  }, [Cin, navigate]);

  return (
    <div>
      <Header />
      Deleting student...
    </div>
  );
};

export default DeleteStudent;
