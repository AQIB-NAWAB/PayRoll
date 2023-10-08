import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [data, setData] = useState({
    name: '',
    email: '',
    gender: '',
    designation: '',
    password: '',
    address: '',
    salary: '',
    image: '',
    dateOfJoined: '',
    hra: '',
    da: '',
    ma: '',
    tax: '',
    deductionForLeave: '',
    welfareFund: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('gender', data.gender);
    formData.append('designation', data.designation);
    formData.append('password', data.password);
    formData.append('address', data.address);
    formData.append('salary', data.salary);
    formData.append('image', data.image);
    formData.append('dateOfJoined', data.dateOfJoined);
    formData.append('hra', data.hra);
    formData.append('da', data.da);
    formData.append('ma', data.ma);
    formData.append('tax', data.tax);
    formData.append('deductionForLeave', data.deductionForLeave);
    formData.append('welfareFund', data.welfareFund);

    axios
      .post('http://localhost:8081/api/v1/create', formData)
      .then((res) => {
        navigate('/employee');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Employee</h2>
      <form className="row g-3 w-50 py-4" onSubmit={handleSubmit}>
		<h4>General Info</h4>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            placeholder="Enter Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
		<div className="col-12">
          <label htmlFor="inputGender" className="form-label">
            Gender
          </label>
          <select
            className="form-control"
            id="inputGender"
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
		<div className="col-12 mb-3">
          <label className="form-label" htmlFor="inputGroupFile01">
            Select Image
          </label>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            autoComplete="off"
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </div>
        
        <div className="col-12">
          <label htmlFor="inputDesignation" className="form-label">
            Designation
          </label>
          <input
            type="text"
            className="form-control"
            id="inputDesignation"
            placeholder="Enter Designation"
            autoComplete="off"
            onChange={(e) => setData({ ...data, designation: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputDateOfJoined" className="form-label">
            Date of Joining
          </label>
          <input
            type="date"
            className="form-control"
            id="inputDateOfJoined"
            onChange={(e) => setData({ ...data, dateOfJoined: e.target.value })}
          />
        </div>
		<h4>Salary Info</h4>
		<div className="col-12">
          <label htmlFor="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            onChange={(e) => setData({ ...data, salary: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputHra" className="form-label">
            HRA
          </label>
          <input
            type="text"
            className="form-control"
            id="inputHra"
            placeholder="Enter HRA"
            autoComplete="off"
            onChange={(e) => setData({ ...data, hra: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputDa" className="form-label">
            DA
          </label>
          <input
            type="text"
            className="form-control"
            id="inputDa"
            placeholder="Enter DA"
            autoComplete="off"
            onChange={(e) => setData({ ...data, da: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputMa" className="form-label">
            MA
          </label>
          <input
            type="text"
            className="form-control"
            id="inputMa"
            placeholder="Enter MA"
            autoComplete="off"
            onChange={(e) => setData({ ...data, ma: e.target.value })}
          />
        </div>
		<h4>Deductions</h4>
        <div className="col-12">
          <label htmlFor="inputTax" className="form-label">
            Tax
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTax"
            placeholder="Enter Tax"
            autoComplete="off"
            onChange={(e) => setData({ ...data, tax: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputDeductionForLeave" className="form-label">
            Deduction for Leave
          </label>
          <input
            type="text"
            className="form-control"
            id="inputDeductionForLeave"
            placeholder="Enter Deduction for Leave"
            autoComplete="off"
            onChange={(e) => setData({ ...data, deductionForLeave: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputWelfareFund" className="form-label">
            Welfare Fund
          </label>
          <input
            type="text"
            className="form-control"
            id="inputWelfareFund"
            placeholder="Enter Welfare Fund"
            autoComplete="off"
            onChange={(e) => setData({ ...data, welfareFund: e.target.value })}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
