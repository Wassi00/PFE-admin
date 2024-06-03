import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddFormation from "./Formations/AddFormation";
import EditFormation from "./Formations/EditFormation";
import DeleteFormation from "./Formations/DeleteFormation";
import AddModule from "./Modules/AddModule";
import EditModule from "./Modules/EditModule";
import DeleteModule from "./Modules/DeleteModule";
import ManageDepartments from "./Departments/ManageDepartments";
import ManageFormation from "./Formations/ManageFormation";
import ManageModule from "./Modules/ManageModule";
import AddDepartment from "./Departments/AddDepartment";
import DeleteDepartment from "./Departments/DeleteDepartment";
import EditDepartment from "./Departments/EditDepartment";
import ManageClasses from "./Classes/ManageClasses";
import AddClass from "./Classes/AddClass";
import EditClass from "./Classes/EditClass";
import DeleteClass from "./Classes/DeleteClass";
import ManageProf from "./Professors/ManageProf";
import AddProf from "./Professors/AddProf";
import EditProf from "./Professors/EditProf";
import DeleteProf from "./Professors/DeleteProf";
import ManageStudents from "./Students/ManageStudents";
import EditStudent from "./Students/EditStudent";
import DeleteStudent from "./Students/DeleteStudent";
import AddStudent from "./Students/AddStudents";

const AdminPanel = () => {
  return (
    <Router>
      <div>
        <h1>Admin Panel</h1>
        <nav>
          <ul>
            <li>
              <Link to="/formations">Manage Formations</Link>
            </li>
            <li>
              <Link to="/modules">Manage Modules</Link>
            </li>
            <li>
              <Link to="/departments">Manage Departments</Link>
            </li>
            <li>
              <Link to="/classes">Manage Classes</Link>
            </li>
            <li>
              <Link to="/Professors">Manage Professors</Link>
            </li>
            <li>
              <Link to="/Students">Manage Students</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/formations" element={<ManageFormation />} />
          <Route path="/formations/add" element={<AddFormation />} />
          <Route path="/formations/edit" element={<EditFormation />} />
          <Route path="/formations/delete" element={<DeleteFormation />} />

          <Route path="/modules" element={<ManageModule />} />
          <Route path="/modules/add" element={<AddModule />} />
          <Route path="/modules/edit" element={<EditModule />} />
          <Route path="/modules/delete" element={<DeleteModule />} />

          <Route path="/departments" element={<ManageDepartments />} />
          <Route path="/departments/add" element={<AddDepartment />} />
          <Route path="/departments/edit" element={<EditDepartment />} />
          <Route path="/departments/delete" element={<DeleteDepartment />} />

          <Route path="/classes" element={<ManageClasses />} />
          <Route path="/classes/add" element={<AddClass />} />
          <Route path="/classes/edit" element={<EditClass />} />
          <Route path="/classes/delete" element={<DeleteClass />} />

          <Route path="/Professors" element={<ManageProf />} />
          <Route path="/professors/add" element={<AddProf />} />
          <Route path="/professors/edit/:Cin" element={<EditProf />} />
          <Route path="/professors/delete/:Cin" element={<DeleteProf />} />

          <Route path="/Students" element={<ManageStudents />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/edit/:Cin" element={<EditStudent />} />
          <Route path="/students/delete/:Cin" element={<DeleteStudent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AdminPanel;
