import React from "react";
import { Link } from "react-router-dom";

function ManageClasses() {
  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/classes/add">Add classes</Link>
            </li>
            <li>
              <Link to="/classes/edit">Edit classes</Link>
            </li>
            <li>
              <Link to="/classes/delete">Delete classes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ManageClasses;
