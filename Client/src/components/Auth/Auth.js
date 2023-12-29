// Auth.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/firebase/firebase'; 
import './Auth.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='auth'>
      <div className='form'>
      <label htmlFor="authEmail">Email:</label>
      <input type="email" id="authEmail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label htmlFor="authPassword">Password:</label>
      <input type="password" id="authPassword" value={password} onChange={(e) => setPassword(e.target.value)} required  />
      <button type="button" onClick={handleSignup}>
        Signup
      </button>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      </div>
    </div>
  );
};

export default Auth;
