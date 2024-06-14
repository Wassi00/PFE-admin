import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import AdminPanel from "./Components/AdminPanel";
import AddFormation from "./Components/Formations/AddFormation";
import EditFormation from "./Components/Formations/EditFormation";
import DeleteFormation from "./Components/Formations/DeleteFormation";
import AddModule from "./Components/Modules/AddModule";
import EditModule from "./Components/Modules/EditModule";
import DeleteModule from "./Components/Modules/DeleteModule";
import AddDepartment from "./Components/Departments/AddDepartment";
import DeleteDepartment from "./Components/Departments/DeleteDepartment";
import EditDepartment from "./Components/Departments/EditDepartment";
import AddClass from "./Components/Classes/AddClass";
import EditClass from "./Components/Classes/EditClass";
import DeleteClass from "./Components/Classes/DeleteClass";
import ManageProf from "./Components/Professors/ManageProf";
import AddProf from "./Components/Professors/AddProf";
import EditProf from "./Components/Professors/EditProf";
import DeleteProf from "./Components/Professors/DeleteProf";
import ManageStudents from "./Components/Students/ManageStudents";
import EditStudent from "./Components/Students/EditStudent";
import DeleteStudent from "./Components/Students/DeleteStudent";
import AddStudent from "./Components/Students/AddStudents";
import ManageClasses from "./Components/Classes/ManageClasses";
import ManageDepartments from "./Components/Departments/ManageDepartments";
import ManageFormations from "./Components/Formations/ManageFormations";
import ManageModules from "./Components/Modules/ManageModules";
import Login from "./Login";

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <AdminPanel />
              </RequireAuth>
            }
          />
          <Route
            path="/formations"
            element={
              <RequireAuth>
                <ManageFormations />
              </RequireAuth>
            }
          />
          <Route
            path="/formations/add"
            element={
              <RequireAuth>
                <AddFormation />
              </RequireAuth>
            }
          />
          <Route
            path="/formations/edit"
            element={
              <RequireAuth>
                <EditFormation />
              </RequireAuth>
            }
          />
          <Route
            path="/formations/delete"
            element={
              <RequireAuth>
                <DeleteFormation />
              </RequireAuth>
            }
          />
          <Route
            path="/modules"
            element={
              <RequireAuth>
                <ManageModules />
              </RequireAuth>
            }
          />
          <Route
            path="/modules/add"
            element={
              <RequireAuth>
                <AddModule />
              </RequireAuth>
            }
          />
          <Route
            path="/modules/edit"
            element={
              <RequireAuth>
                <EditModule />
              </RequireAuth>
            }
          />
          <Route
            path="/modules/delete"
            element={
              <RequireAuth>
                <DeleteModule />
              </RequireAuth>
            }
          />
          <Route
            path="/departments"
            element={
              <RequireAuth>
                <ManageDepartments />
              </RequireAuth>
            }
          />
          <Route
            path="/departments/add"
            element={
              <RequireAuth>
                <AddDepartment />
              </RequireAuth>
            }
          />
          <Route
            path="/departments/edit"
            element={
              <RequireAuth>
                <EditDepartment />
              </RequireAuth>
            }
          />
          <Route
            path="/departments/delete"
            element={
              <RequireAuth>
                <DeleteDepartment />
              </RequireAuth>
            }
          />
          <Route
            path="/classes"
            element={
              <RequireAuth>
                <ManageClasses />
              </RequireAuth>
            }
          />
          <Route
            path="/classes/add"
            element={
              <RequireAuth>
                <AddClass />
              </RequireAuth>
            }
          />
          <Route
            path="/classes/edit"
            element={
              <RequireAuth>
                <EditClass />
              </RequireAuth>
            }
          />
          <Route
            path="/classes/delete"
            element={
              <RequireAuth>
                <DeleteClass />
              </RequireAuth>
            }
          />
          <Route
            path="/Professors"
            element={
              <RequireAuth>
                <ManageProf />
              </RequireAuth>
            }
          />
          <Route
            path="/professors/add"
            element={
              <RequireAuth>
                <AddProf />
              </RequireAuth>
            }
          />
          <Route
            path="/professors/edit/:Cin"
            element={
              <RequireAuth>
                <EditProf />
              </RequireAuth>
            }
          />
          <Route
            path="/professors/delete/:Cin"
            element={
              <RequireAuth>
                <DeleteProf />
              </RequireAuth>
            }
          />
          <Route
            path="/Students"
            element={
              <RequireAuth>
                <ManageStudents />
              </RequireAuth>
            }
          />
          <Route
            path="/students/add"
            element={
              <RequireAuth>
                <AddStudent />
              </RequireAuth>
            }
          />
          <Route
            path="/students/edit/:Cin"
            element={
              <RequireAuth>
                <EditStudent />
              </RequireAuth>
            }
          />
          <Route
            path="/students/delete/:Cin"
            element={
              <RequireAuth>
                <DeleteStudent />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
