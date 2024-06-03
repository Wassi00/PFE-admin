// src/components/Professors/ManageProfessors.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "../../constants";

const ManageProfessors = () => {
  const [professors, setProfessors] = useState([]);
  const [searchCIN, setSearchCIN] = useState("");
  const [searchBy, setSearchBy] = useState("cin");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessors = async () => {
      let endpoint = `${url}/professors`;
      if (searchBy === "cin" && searchCIN) {
        endpoint += `/${searchCIN}`;
      } else if (searchBy === "department" && selectedDepartment) {
        endpoint += `/department/${selectedDepartment}`;
      }
      try {
        const response = await axios.get(endpoint);
        if (searchBy === "cin" && searchCIN) setProfessors([response.data]);
        else setProfessors(response.data);
      } catch (error) {
        console.error("Error fetching professors:", error);
        setProfessors([]);
      }
    };
    fetchProfessors();
  }, [searchBy, searchCIN, selectedDepartment]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${url}/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/professors/add")}>Add Professor</button>
      <div>
        <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
          <option value="cin">Search by CIN</option>
          <option value="department">Search by Department</option>
        </select>
        {searchBy === "department" && (
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.code} value={department.code}>
                {department.intitule}
              </option>
            ))}
          </select>
        )}
        {searchBy === "cin" && (
          <input
            type="text"
            placeholder="Enter CIN"
            value={searchCIN}
            onChange={(e) => setSearchCIN(e.target.value)}
          />
        )}
      </div>
      <div>
        {professors.map((professor) => (
          <div key={professor.Cin}>
            <p>
              {professor.nom} {professor.prenom}
            </p>
            <button
              onClick={() => navigate(`/professors/edit/${professor.Cin}`)}
            >
              Edit
            </button>
            <button
              onClick={() => navigate(`/professors/delete/${professor.Cin}`)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProfessors;
