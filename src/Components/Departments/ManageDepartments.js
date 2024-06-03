import React from "react";
import { Link } from "react-router-dom";

function ManageDepartments() {
  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/departments/add">Add departments</Link>
            </li>
            <li>
              <Link to="/departments/edit">Edit departments</Link>
            </li>
            <li>
              <Link to="/departments/delete">Delete departments</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ManageDepartments;
