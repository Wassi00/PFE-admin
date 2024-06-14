import React from "react";
import { Button, Card, Flowbite } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const AdminPanel = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    window.location.reload();
  };

  const navF = () => {
    navigate("/formations");
  };

  const navM = () => {
    navigate("/modules");
  };

  const navC = () => {
    navigate("/classes");
  };

  const navP = () => {
    navigate("/Professors");
  };

  const navE = () => {
    navigate("/Students");
  };

  const navD = () => {
    navigate("/departments");
  };

  return (
    <Flowbite theme={{ mode: "dark" }}>
      <div
        className="flex items-center justify-center max-h-screen bg-gray-100 dark:bg-gray-900"
        style={{ height: "100vh", flexDirection: "column", gap: "1.5rem" }}
      >
        <img src={logo} alt="logo" style={{ width: "8rem", height: "7rem" }} />
        <h1
          className="text-white font-bold mb-10"
          style={{ fontSize: "2.3rem" }}
        >
          Dashbord
        </h1>
        <div
          className="flex flex-wrap items-center justify-center"
          style={{ flexDirection: "row", gap: "2rem" }}
        >
          <Card className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Gestion des Formations
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Ajouter, Modifier ou Supprimer une Formation
            </p>
            <Button onClick={navF}>
              Gestion des Formations
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
          <Card className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Gestion des Modules
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Ajouter, Modifier ou supprimer un module
            </p>
            <Button onClick={navM}>
              Gestion des Modules
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
          <Card className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Gestion des Classes
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Ajouter, Modifier ou Supprimer une classe
            </p>
            <Button onClick={navC}>
              Gestion des Classes
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
          <Card className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Gestion des Professeurs
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Ajouter, Modifier ou Supprimer un Professeur
            </p>
            <Button onClick={navP}>
              Gestion des Professeurs
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
          <Card className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Gestion des Etudiants
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Ajouter, Modifier ou Supprimer un Etudiant
            </p>
            <Button onClick={navE}>
              Gestion des Etudiants
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
          <Card className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Gestion des Départements
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Ajouter, Modifier ou Supprimer un Département
            </p>
            <Button onClick={navD}>
              Gestion des Départements
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
        </div>
        <Button
          color={"failure"}
          className="w-min dark:bg-red-700 dark:text-gray-200"
          onClick={logout}
        >
          LogOut
        </Button>
      </div>
    </Flowbite>
  );
};

export default AdminPanel;
