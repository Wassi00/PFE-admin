import React from "react";
import { Link } from "react-router-dom";

function ManageFormation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/formations/add">Add Formations</Link>
        </li>
        <li>
          <Link to="/formations/edit">Edit Formations</Link>
        </li>
        <li>
          <Link to="/formations/delete">Delete Formations</Link>
        </li>
      </ul>
    </nav>
  );
}

export default ManageFormation;
