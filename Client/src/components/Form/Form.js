// Importing necessary modules and styles
import React, { useState } from 'react';
import './Form.css';

// Form component for user data input
const Form = ({ onSubmit, onAddClick, onDumpStateClick, setUserData }) => {
  // State to manage form data (name, email, phone)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Function to handle input changes in the form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the provided onSubmit function with form data
    onSubmit(formData);
    // Update user data with the form data
    setUserData(formData);
    // Clear the form data after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
    });
  };

  // Rendering the Form component
  return (
    <form id="userForm" onSubmit={handleSubmit}>
      {/* Name input field */}
      <label htmlFor="userName">Name:</label>
      <input
        type="text"
        id="userName"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      {/* Email input field */}
      <label htmlFor="userEmail">Email:</label>
      <input
        type="email"
        id="userEmail"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Phone input field */}
      <label htmlFor="userPhone">Phone:</label>
      <input
        type="text"
        id="userPhone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      {/* Button container with Submit, Add, and Dump State to JSON buttons */}
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

// Exporting the Form component
export default Form;
