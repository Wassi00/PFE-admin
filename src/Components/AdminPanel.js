import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddFormation from "./Formations/AddFormation";
import EditFormation from "./Formations/EditFormation";
import DeleteFormation from "./Formations/DeleteFormation";
import AddModule from "./Modules/AddModule";
import EditModule from "./Modules/EditModule";
import DeleteModule from "./Modules/DeleteModule";
import AddDepartment from "./Departments/AddDepartment";
import DeleteDepartment from "./Departments/DeleteDepartment";
import EditDepartment from "./Departments/EditDepartment";
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
import { Dropdown, Navbar } from "flowbite-react";

const AdminPanel = () => {
  return (
    <Router>
      <div>
        <Navbar fluid rounded className="lg:justify-center">
          <div className="flex justify-between w-full lg:w-auto">
            <div className="flex md:order-2">
              <Navbar.Toggle />
            </div>
          </div>
          <Navbar.Collapse className="lg:flex lg:justify-center lg:space-x-4">
            <Navbar.Link href="/" className="text-white">
              Home
            </Navbar.Link>
            <Navbar.Link className="text-white">
              <Link to="/formations">
                <Dropdown
                  arrowIcon={true}
                  inline
                  label={<div>Manage Formations</div>}
                >
                  <Dropdown.Item>
                    <Navbar.Link className="text-white">
                      <Link to="/formations/add">Add Formations</Link>
                    </Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link className="text-white">
                      <Link to="/formations/edit">Edit Formations</Link>
                    </Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link className="text-white">
                      <Link to="/formations/delete">Delete Formations</Link>
                    </Navbar.Link>
                  </Dropdown.Item>
                </Dropdown>
              </Link>
            </Navbar.Link>
            <Navbar.Link className="text-white">
              <Dropdown
                arrowIcon={true}
                inline
                label={<div>Manage Modules</div>}
              >
                <Dropdown.Item>
                  <Navbar.Link className="text-white">
                    <Link to="/modules/add">Add Modules</Link>
                  </Navbar.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Navbar.Link className="text-white">
                    <Link to="/modules/edit">Edit Modules</Link>
                  </Navbar.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Navbar.Link className="text-white">
                    <Link to="/modules/delete">Delete Modules</Link>
                  </Navbar.Link>
                </Dropdown.Item>
              </Dropdown>
            </Navbar.Link>
            <Navbar.Link className="text-white">
              <Dropdown
                arrowIcon={true}
                inline
                label={<div>Manage Departments</div>}
              >
                <Dropdown.Item>
                  <Navbar.Link className="text-white">
                    <Link to="/departments/add">Add Departments</Link>
                  </Navbar.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Navbar.Link className="text-white">
                    <Link to="/departments/edit">Edit Departments</Link>
                  </Navbar.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Navbar.Link className="text-white">
                    <Link to="/departments/delete">Delete Departments</Link>
                  </Navbar.Link>
                </Dropdown.Item>
              </Dropdown>
            </Navbar.Link>
            <Navbar.Link className="text-white">
              <Dropdown
                arrowIcon={true}
                inline
                label={<div>Manage Classes</div>}
              >
                <Dropdown.Item>
                  <Navbar.Link className="text-white">
                    <Link to="/classes/add">Add Classes</Link>
                  </Navbar.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Navbar.Link className="text-white">
                    <Link to="/classes/edit">Edit Classes</Link>
                  </Navbar.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Navbar.Link className="text-white">
                    <Link to="/classes/delete">Delete Classes</Link>
                  </Navbar.Link>
                </Dropdown.Item>
              </Dropdown>
            </Navbar.Link>
            <Navbar.Link className="text-white">
              <Link to="/Professors">Manage Professors</Link>
            </Navbar.Link>
            <Navbar.Link className="text-white">
              <Link to="/Students">Manage Students</Link>
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/formations/add" element={<AddFormation />} />
          <Route path="/formations/edit" element={<EditFormation />} />
          <Route path="/formations/delete" element={<DeleteFormation />} />

          <Route path="/modules/add" element={<AddModule />} />
          <Route path="/modules/edit" element={<EditModule />} />
          <Route path="/modules/delete" element={<DeleteModule />} />

          <Route path="/departments/add" element={<AddDepartment />} />
          <Route path="/departments/edit" element={<EditDepartment />} />
          <Route path="/departments/delete" element={<DeleteDepartment />} />

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
