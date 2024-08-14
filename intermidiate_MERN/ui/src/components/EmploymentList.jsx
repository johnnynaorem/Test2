import React, { useState, useEffect, useRef } from "react";
import Layout from "./Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmploymentList = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idEdit, setIdEdit] = useState(null);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    designation: '',
    gender: '',
    course: []
  });
  const navigate = useNavigate();
  const btnref = useRef(null);

  const getEmployee = async () => {
    try {
      const { data } = await axios.get("http://localhost:8700/api/v1/auth/getAll");
      setEmployee(data);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`http://localhost:8700/api/v1/auth/delete-user/${id}`);
      if (data.success) {
        alert("Successfully Deleted");
        getEmployee();
      }
    } catch (error) {
      alert(error.message || "An error occurred");
    }
  };

  const handleOpenModal = (e, id) => {
    e.preventDefault();
    setIdEdit(id);
    const selectedEmployee = employee.find(emp => emp._id === id);
    if (selectedEmployee) {
      setEditData({
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        mobileNumber: selectedEmployee.mobileNumber,
        designation: selectedEmployee.designation,
        gender: selectedEmployee.gender,
        course: selectedEmployee.course
      });
    }
    btnref.current.click();
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (prev[name].includes(value) ? prev[name].filter(course => course !== value) : [...prev[name], value]) : value
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:8700/api/v1/auth/update-user/${idEdit}`, editData);
      if (data.success) {
        alert("Successfully Updated");
        getEmployee();
        setIdEdit(null);
        setEditData({
          name: '',
          email: '',
          mobileNumber: '',
          designation: '',
          gender: '',
          course: []
        });
      }
    } catch (error) {
      alert(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <div className="container">
        <div className="mt-2">
          <button className="btn btn-secondary" onClick={() => navigate("/addemployee")}>
            Add Employee
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Unique ID</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Gender</th>
              <th scope="col">Designation</th>
              <th scope="col">Course</th>
              <th scope="col">Create Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.length > 0 ? (
              employee.map((emp) => (
                <tr key={emp._id}>
                  <th scope="row">{emp._id}</th>
                  <td>
                    <img
                      style={{ borderRadius: "50%" }}
                      src={`http://localhost:8700/api/v1/auth/user-image/${emp._id}`}
                      alt={emp.name}
                      width={30}
                      height={30}
                    />
                  </td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.mobileNumber}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.course}</td>
                  <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-primary" onClick={(e) => handleOpenModal(e, emp._id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={(e) => handleDelete(e, emp._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={btnref}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Employee
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="inputField">
                    <div className="usernameField">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        required
                        value={editData.name}
                        onChange={handleEditChange}
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="email">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        required
                        value={editData.email}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="mobileNumber">
                      <label htmlFor="mobileNumber">Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="mobileNumber"
                        name="mobileNumber"
                        placeholder="Enter Mobile Number"
                        required
                        value={editData.mobileNumber}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="designation">
                      <label htmlFor="designation">Designation</label>
                      <select
                        className="form-control"
                        id="designation"
                        name="designation"
                        value={editData.designation}
                        onChange={handleEditChange}
                      >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                      </select>
                    </div>
                    <div className="gender d-flex">
                      <label>Gender</label>
                      <div className="mx-2">
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="M"
                          checked={editData.gender === 'M'}
                          onChange={handleEditChange}
                        />
                        <label htmlFor="male">Male</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="F"
                          checked={editData.gender === 'F'}
                          onChange={handleEditChange}
                        />
                        <label htmlFor="female">Female</label>
                      </div>
                    </div>
                    <div className="course my-2">
                      <label>Course</label>
                      <div className="d-flex flex-wrap">
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            id="MCA"
                            name="course"
                            value="MCA"
                            checked={editData.course.includes('MCA')}
                            onChange={handleEditChange}
                          />
                          <label htmlFor="MCA">MCA</label>
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            id="BCA"
                            name="course"
                            value="BCA"
                            checked={editData.course.includes('BCA')}
                            onChange={handleEditChange}
                          />
                          <label htmlFor="BCA">BCA</label>
                        </div>
                        <div className="mx-2">
                          <input
                            type="checkbox"
                            id="BSC"
                            name="course"
                            value="BSC"
                            checked={editData.course.includes('BSC')}
                            onChange={handleEditChange}
                          />
                          <label htmlFor="BSC">BSC</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleEdit}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmploymentList;
