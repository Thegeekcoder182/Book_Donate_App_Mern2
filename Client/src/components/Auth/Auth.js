// Importing necessary modules and styles
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/firebase/firebase';
import './Auth.css';

// Auth component for handling user authentication
const Auth = () => {
  // State to manage email input
  const [email, setEmail] = useState('');

  // State to manage password input
  const [password, setPassword] = useState('');

  // Function to handle user signup
  const handleSignup = async () => {
    try {
      // Create a new user account with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!');
    } catch (error) {
      // Display an alert in case of an error during signup
      alert(error.message);
    }
  };

  // Function to handle user login
  const handleLogin = async () => {
    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
    } catch (error) {
      // Display an alert in case of an error during login
      alert(error.message);
    }
  };

  // Rendering the Auth component
  return (
    <div className='auth'>
      <div className='form'>
        {/* Email input field */}
        <label htmlFor="authEmail">Email:</label>
        <input type="email" id="authEmail" value={email} onChange={(e) => setEmail(e.target.value)} required />

        {/* Password input field */}
        <label htmlFor="authPassword">Password:</label>
        <input type="password" id="authPassword" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {/* Signup button */}
        <button type="button" onClick={handleSignup}>
          Signup
        </button>

        {/* Login button */}
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

// Exporting the Auth component
export default Auth;
