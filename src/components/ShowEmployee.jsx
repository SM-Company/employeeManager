import React, { useEffect, useState } from "react";
import "../assets/pencil-square.svg";
import "../assets/trash.svg";
import swal from "sweetalert";

const endpoint = "https://sea-lion-app-6jzja.ondigitalocean.app/api/employees";
const ShowEmployees = ({ editEmployee, reload, setReload, handleUpdate }) => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getAllEmployees();
  }, [reload]);

  const confirmDelete = (id) => {
    swal({
      text: "Are you sure to delete it",
      icon: "warning",
      buttons: ["Cancel", "Accept"],
    }).then((Response) => {
      if (Response) {
        deleteEmployee(id);
      }
    });
  };

  const getAllEmployees = () => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((employees) => setEmployees(employees));
  };

  const deleteEmployee = (id) => {
    fetch(`${endpoint}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setReload(reload + 1);
      });
  };

  return (
    <div className="table-container">
      <table className="table table-striped w-auto">
        <thead className="text-white bg-dark">
          <tr>
            <th scope="col">COD</th>
            <th scope="col">DNI</th>
            <th scope="col">Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Workstation</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <th scope="row">{employee.id}</th>
              <td>{employee.dni}</td>
              <td>{employee.names}</td>
              <td>{employee.last_names}</td>
              <td>{employee.workstation}</td>
              <th>
                <button
                  className="btn btn-warning btn-edit"
                  onClick={() => {
                    editEmployee(employee.id);
                    handleUpdate();
                  }}
                >
                  <i className="fas fa-marker"></i>
                </button>
                <button
                  className="btn btn-danger btn-delete"
                  onClick={() => confirmDelete(employee.id)}
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowEmployees;
