import React, { useState } from 'react';
import './Form.css';

const Form = ({ onSubmit, onAddClick, onDumpStateClick, setUserData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setUserData(formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <form id="userForm" onSubmit={handleSubmit}>
      <label htmlFor="userName">Name:</label>
      <input
        type="text"
        id="userName"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="userEmail">Email:</label>
      <input
        type="email"
        id="userEmail"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="userPhone">Phone:</label>
      <input
        type="text"
        id="userPhone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <div className="button-container">
        <button type="submit">Submit</button>
        <button type="button" onClick={onAddClick}>
          Add
        </button>
        <button type="button" onClick={onDumpStateClick}>
          Dump State to JSON
        </button>
      </div>
    </form>
  );
};

export default Form;
