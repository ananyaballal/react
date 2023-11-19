// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://stg.dhunjam.in/account/admin/login', {
        username: 'DJ@4',
        password: 'Dhunjam@2023',
      });

      const { data } = response;
      if (data.status === 200 && data.response === 'Success') {
        onLogin(data.data.token); // Pass the token to the parent component
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred during login', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#FFF', padding: '20px', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '300px' }}>
        <h1 style={{ textAlign: 'center' }}>Venue Admin Login</h1>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', backgroundColor: '#F0C3F1', border: '1px solid #FFFFFF', width: '100%', borderRadius: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', backgroundColor: '#F0C3F1', border: '1px solid #FFFFFF', width: '100%', borderRadius: '8px' }}
          />
        </div>
        <button onClick={handleLogin} style={{ padding: '10px', backgroundColor: '#6741D9', color: '#FFFFFF', width: '100%', borderRadius: '8px' }}>
          Sign In
        </button>
        <p style={{ marginTop: '10px', textAlign: 'center' }}>
          <a href="#" style={{ color: '#FFF' }}>
            New Registration?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
