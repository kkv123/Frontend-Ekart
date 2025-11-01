import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login, setAuthToken } from '../services/api';
import './Login.css'; // ensure this file exists in src/pages

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(username, password, email || undefined);

      // make sure token is set (in case api.login didn't find it)
      const token = data?.token || data?.authToken || data?.accessToken || localStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
        history.push('/dashboard');
      } else {
        setError('Login succeeded but no token returned');
      }
    } catch (err: any) {
      setError(err?.message || 'Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="email">Email (optional)</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;