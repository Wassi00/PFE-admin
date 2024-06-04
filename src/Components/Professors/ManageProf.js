// src/components/Professors/ManageProfessors.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "../../constants";
import { Button, Label, Select, Table, TextInput } from "flowbite-react";

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
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      style={{ height: "94vh", flexDirection: "column", gap: "2rem" }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg overflow-auto">
        <h1 className="text-white font-bold mb-4">Manage Professors</h1>
        <div className="mb-5">
          {/* <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="cin">Search by CIN</option>
            <option value="department">Search by Department</option>
          </select> */}

          <div className="mb-2 block">
            <Label htmlFor="formations" value="Select a formation" />
          </div>
          <Select
            id="formations"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            required
            className="mb-5"
          >
            <option value="cin">Search by CIN</option>
            <option value="department">Search by Department</option>
          </Select>

          {searchBy === "department" && (
            // <select
            //   value={selectedDepartment}
            //   onChange={(e) => setSelectedDepartment(e.target.value)}
            // >
            //   <option value="">Select Department</option>
            //   {departments.map((department) => (
            //     <option key={department.code} value={department.code}>
            //       {department.intitule}
            //     </option>
            //   ))}
            // </select>
            <>
              <div className="mb-2 block">
                <Label htmlFor="formations" value="Select Department" />
              </div>
              <Select
                id="formations"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                required
                className="mb-5"
              >
                {departments.map((department) => (
                  <option key={department.code} value={department.code}>
                    {department.intitule}
                  </option>
                ))}
              </Select>
            </>
          )}

          {searchBy === "cin" && (
            // <input
            //   type="text"
            //   placeholder="Enter CIN"
            //   value={searchCIN}
            //   onChange={(e) => setSearchCIN(e.target.value)}
            // />
            <TextInput
              type="text"
              placeholder="Enter CIN"
              value={searchCIN}
              onChange={(e) => setSearchCIN(e.target.value)}
              required
              className="mt-1 dark:bg-gray-700 dark:text-gray-200"
            />
          )}
        </div>
        <Button className="mb-5" onClick={() => navigate("/professors/add")}>
          Add Professor
        </Button>
        <div>
          <Table>
            <Table.Head>
              <Table.HeadCell>Professor Name</Table.HeadCell>
              <Table.HeadCell>Professor CIN</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {professors.map((professor) => (
                <Table.Row
                  key={professor.Cin}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {professor.nom} {professor.prenom}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {professor.Cin}
                  </Table.Cell>
                  <Table.Cell
                    className="text-yellow-400"
                    onClick={() =>
                      navigate(`/professors/edit/${professor.Cin}`)
                    }
                  >
                    Edit
                  </Table.Cell>
                  <Table.Cell
                    className="text-red-500"
                    onClick={() =>
                      navigate(`/professors/delete/${professor.Cin}`)
                    }
                  >
                    Delete
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

export default ManageProfessors;
