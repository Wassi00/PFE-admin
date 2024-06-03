import React from "react";
import { Link } from "react-router-dom";

function ManageModule() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/modules/add">Add modules</Link>
          </li>
          <li>
            <Link to="/modules/edit">Edit modules</Link>
          </li>
          <li>
            <Link to="/modules/delete">Delete modules</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ManageModule;
