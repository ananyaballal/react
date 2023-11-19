// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import AdminDashboard from './AdminDashboard';

function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (userToken) => {
    setToken(userToken);
  };

  return (
    <div>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <AdminDashboard token={token} />
      )}
    </div>
  );
}

export default App;
