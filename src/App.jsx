import ShowEmployee from "./components/ShowEmployee";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [id, setId] = useState(0);
  const [dni, setDni] = useState(0);
  const [dniFull, setDniFull] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [workstation, setWorkstation] = useState("");
  const [reload, setReload] = useState(0);
  const [dniAlert, setDniAlert] = useState(true);
  const [updateDisable, setupdateDisable] = useState(true);

  useEffect(() => {
    dni.length == 11 &&
    dni.includes(".") == false
      ? setDniFull(true)
      : setDniFull(false);
  }, [dni, name]);

  const handleDni = (dni) => {
    if (dni < 100000000000) {
      setDni(dni.slice(0, 11));
    }
  };

  const handleUpdate = () => {
    setupdateDisable(false);
  };

  const register = () => {
    const endpoint =
      "https://sea-lion-app-6jzja.ondigitalocean.app/api/employees";
    const newPost = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dni: dni,
        names: name,
        last_names: lastName,
        workstation: workstation,
      }),
    };
    fetch(endpoint, newPost)
      .then((res) => res.json())
      .then(() => setReload(reload + 1))
      .catch(() => {
        setDniAlert(false);
      });
  };

  const editEmployee = (id) => {
    const endpoint = `https://sea-lion-app-6jzja.ondigitalocean.app/api/employees/${id}`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((employee) => {
        setId(employee.employee.id);
        setDni(employee.employee.dni);
        setName(employee.employee.names);
        setLastName(employee.employee.last_names);
        setWorkstation(employee.employee.workstation);
      });
  };

  const updateEmployee = () => {
    const endpoint = `https://sea-lion-app-6jzja.ondigitalocean.app/api/employees/${id}`;
    const newPost = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dni: dni,
        names: name,
        last_names: lastName,
        workstation: workstation,
      }),
    };
    fetch(endpoint, newPost)
      .then((res) => res.json())
      .then(() => {
        setReload(reload + 1);
      })
      .catch(() => {
        setDniAlert(false);
        setTimeout(() => {
          setDniAlert(true);
        }, 10000);
      });
  };

  return (
    <div className="App">
      <form className="form">
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
          hidden={dniAlert}
        >
          The dni is invalid or has already been taken
          <button
            type="button"
            className="btn close"
            data-dismiss="alert"
            aria-label="Close"
            style={{ marginLeft: "10px" }}
            onClick={() => setDniAlert(true)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <input
          type="number"
          name="dni"
          value={dni}
          placeholder="DNI"
          className="form-control mb-2"
          onChange={(e) => {
            handleDni(e.target.value);
          }}
        />
        <input
          type="text"
          name="names"
          value={name}
          placeholder="Names"
          className="form-control mb-2"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="last_names"
          value={lastName}
          placeholder="Last names"
          className="form-control mb-2"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          name="workstation"
          value={workstation}
          placeholder="Workstation"
          className="form-control mb-2"
          onChange={(e) => setWorkstation(e.target.value)}
        />
        <input
          type="submit"
          name="register"
          value="Register"
          disabled={
            dniFull == false ||
            lastName == "" ||
            name == "" ||
            workstation == ""
              ? true
              : false
          }
          className="btn btn-primary register"
          onClick={(e) => {
            e.preventDefault();
            register();
            setupdateDisable(true);
          }}
        />
        <input
          type="submit"
          name="update"
          value="Update"
          disabled={
            dniFull == false ||
            updateDisable ||
            lastName == "" ||
            name == "" ||
            workstation == ""
              ? true
              : false
          }
          className="btn btn-secondary update"
          onClick={(e) => {
            e.preventDefault();
            updateEmployee();
          }}
        />
        <input
          type="reset"
          name="clear"
          value="Clear"
          onClick={() => {
            setDni(0);
            setName("");
            setLastName("");
            setWorkstation("");
          }}
          className="btn btn-secondary clear"
        />
      </form>
      <ShowEmployee
        editEmployee={editEmployee}
        reload={reload}
        setReload={setReload}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
