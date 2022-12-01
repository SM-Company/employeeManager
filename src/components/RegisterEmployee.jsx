import React, { useState } from "react";
import "./style.css";

function RegisterEmployee() {
  const [dni, setDni] = useState(0);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [workstation, setWorkstation] = useState("");

  const handleDni = (dni) => {
    if (dni < 100000000000) {
      setDni(dni.slice(0, 11));
    }
  };

  const register = () => {
    const endpoint = "https://sea-lion-app-6jzja.ondigitalocean.app/api/employees";
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
      .then((res) => res.json)
      .then((data) => console.dir(data));
  };

  return (
    <div className="form-container">
      <form className="form">
        <input
          type="number"
          name="dni"
          value={dni}
          placeholder="Dni"
          className="form-control mb-2"
          onChange={(e) => {
            handleDni(e.target.value);
          }}
        />
        <input
          type="text"
          name="names"
          placeholder="Names"
          className="form-control mb-2"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="last_names"
          placeholder="Last_names"
          className="form-control mb-2"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          name="workstation"
          placeholder="Workstation"
          className="form-control mb-2"
          onChange={(e) => setWorkstation(e.target.value)}
        />
        <input
          type="submit"
          name="register"
          value="Register"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            register();
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
          className="btn btn-secondary"
        />
      </form>
    </div>
  );
}

export default RegisterEmployee;
