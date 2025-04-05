import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      () => {
        setEmployeeList(
          employeeList.map((val) =>
            val.id === id
              ? { ...val, wage: newWage }
              : val
          )
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setEmployeeList(employeeList.filter((val) => val.id !== id));
    });
  };

  return (
    <div className="App">
      <h1 style={{ color: "#67595e", marginBottom: "20px" }}>Employee Manager</h1>

      <div className="information">
        <label>Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />

        <label>Age:</label>
        <input type="number" onChange={(e) => setAge(e.target.value)} />

        <label>Country:</label>
        <input type="text" onChange={(e) => setCountry(e.target.value)} />

        <label>Position:</label>
        <input type="text" onChange={(e) => setPosition(e.target.value)} />

        <label>Wage (year):</label>
        <input type="number" onChange={(e) => setWage(e.target.value)} />

        <button onClick={addEmployee}>Add Employee</button>
      </div>

      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val) => (
          <div key={val.id} className="employee">
            <div>
              <h3>Name: {val.name}</h3>
              <h3>Age: {val.age}</h3>
              <h3>Country: {val.country}</h3>
              <h3>Position: {val.position}</h3>
              <h3>Wage: {val.wage}</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="number"
                placeholder="New wage..."
                onChange={(e) => setNewWage(e.target.value)}
              />
              <button onClick={() => updateEmployeeWage(val.id)}>Update</button>
              <button onClick={() => deleteEmployee(val.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
