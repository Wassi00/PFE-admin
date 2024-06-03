import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../constants";

const DeleteClass = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    try {
      const fetchClasses = async () => {
        const response = await axios.get(`${url}/classes`);
        setClasses(response.data);
      };
      fetchClasses();
    } catch (error) {
      console.log("failed to fetch classes" + error);
    }
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(url + `/classes/${selectedClass}`);
      alert("Class deleted successfully");
    } catch (error) {
      console.error("Error deleting class", error);
      alert("Error deleting class");
    }
  };

  return (
    <div>
      <h2>Select Class to Delete</h2>
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
      >
        <option value="">Select Class</option>
        {classes.map((classe) => (
          <option key={classe.code} value={classe.code}>
            {classe.name}
          </option>
        ))}
      </select>
      <button onClick={handleDelete} disabled={!selectedClass}>
        Delete Class
      </button>
    </div>
  );
};

export default DeleteClass;
