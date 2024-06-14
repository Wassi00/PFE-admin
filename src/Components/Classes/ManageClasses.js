import { Button, Card, Flowbite } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

function ManageClasses() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    window.location.reload();
  };

  const navA = () => {
    navigate("/classes/add");
  };

  const navE = () => {
    navigate("/classes/edit");
  };

  const navD = () => {
    navigate("/classes/delete");
  };

  return (
    <Flowbite theme={{ mode: "dark" }}>
      <div
        className="flex items-center justify-center max-h-screen bg-gray-100 dark:bg-gray-900"
        style={{ height: "100vh", flexDirection: "column", gap: "2rem" }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ width: "12rem", height: "10rem" }}
        />
        <h1
          className="text-white font-bold mb-10"
          style={{ fontSize: "2.5rem" }}
        >
          Gestion des Classes
        </h1>
        <div
          className="flex items-center justify-center"
          style={{ flexDirection: "row", gap: "2rem" }}
        >
          <Card className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Créer une classe
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Ajouter une nouvelle classe au système
            </p>
            <Button onClick={navA}>
              Créer
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
              Modifier une classe
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Modifier les détails d'une classe existante
            </p>
            <Button onClick={navE}>
              Modifier
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
              Supprimer une classe
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Supprimer une classe existante dans la base des données
            </p>
            <Button onClick={navD}>
              Supprimer
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
}

export default ManageClasses;
