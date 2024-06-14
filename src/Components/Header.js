import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Navbar } from "flowbite-react";
import logo from "../images/logo.png";

function Header() {
  const logout = () => {
    localStorage.setItem("token", "");
    window.location.reload();
  };
  return (
    <div>
      <Navbar fluid rounded className="lg:justify-center">
        <div className="flex justify-between w-full lg:w-auto">
          <div className="flex md:order-2">
            <Navbar.Toggle />
          </div>
        </div>
        <Navbar.Brand href="https://flowbite-react.com">
          <img
            src={logo}
            alt="USMBA"
            style={{ width: "5 rem", height: "5rem" }}
          />
        </Navbar.Brand>
        <Navbar.Collapse className="lg:flex lg:justify-center lg:space-x-4">
          <Navbar.Link href="/" className="text-white">
            Home
          </Navbar.Link>
          <Navbar.Link className="text-white">
            <Dropdown
              arrowIcon={true}
              inline
              label={<div>Gestion des Formations</div>}
            >
              <Dropdown.Item>
                <Navbar.Link className="text-white">
                  <Link to="/formations/add">Ajouter une Formation</Link>
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Navbar.Link className="text-white">
                  <Link to="/formations/edit">Modifier une Formation</Link>
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Navbar.Link className="text-white">
                  <Link to="/formations/delete">Supprimer une Formation</Link>
                </Navbar.Link>
              </Dropdown.Item>
            </Dropdown>
          </Navbar.Link>
          <Navbar.Link className="text-white">
            <Dropdown
              arrowIcon={true}
              inline
              label={<div>Gestion des Modules</div>}
            >
              <Dropdown.Item>
                <Navbar.Link className="text-white">
                  <Link to="/modules/add">Ajouter un Module</Link>
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Navbar.Link className="text-white">
                  <Link to="/modules/edit">Modifier un Module</Link>
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Navbar.Link className="text-white">
                  <Link to="/modules/delete">Supprimer un Module</Link>
                </Navbar.Link>
              </Dropdown.Item>
            </Dropdown>
          </Navbar.Link>
          <Navbar.Link className="text-white">
            <Dropdown
              arrowIcon={true}
              inline
              label={<div>Gestion des Departements</div>}
            >
              <Dropdown.Item>
                <Navbar.Link className="text-white">
                  <Link to="/departments/add">Ajouter un Département</Link>
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Navbar.Link className="text-white">
                  <Link to="/departments/edit">Modifier un Département</Link>
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Navbar.Link className="text-white">
                  <Link to="/departments/delete">Supprimer un Département</Link>
                </Navbar.Link>
              </Dropdown.Item>
            </Dropdown>
          </Navbar.Link>
          <Navbar.Link className="text-white">
            <Dropdown
              arrowIcon={true}
              inline
              label={<div>Gestion des Classes</div>}
            >
              <Dropdown.Item>
                <Navbar.Link className="text-white">
                  <Link to="/classes/add">Ajouter une Classe</Link>
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Navbar.Link className="text-white">
                  <Link to="/classes/edit">Modifier une Classe</Link>
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Navbar.Link className="text-white">
                  <Link to="/classes/delete">Supprimer une Classe</Link>
                </Navbar.Link>
              </Dropdown.Item>
            </Dropdown>
          </Navbar.Link>
          <Navbar.Link className="text-white">
            <Link to="/Professors">Gestion des Professeurs</Link>
          </Navbar.Link>
          <Navbar.Link className="text-white">
            <Link to="/Students">Gestion des Etudiants</Link>
          </Navbar.Link>
        </Navbar.Collapse>
        <Button
          color={"failure"}
          className="w-min dark:bg-blue-700 dark:text-gray-200"
          onClick={logout}
        >
          LogOut
        </Button>
      </Navbar>
    </div>
  );
}

export default Header;
