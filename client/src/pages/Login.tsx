import React, { useState } from 'react';
import AuthService from '../utils/auth';
import '../index.css'; // Import the CSS file

interface UserLoginInterface {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [userLogin, setUserLogin] = useState<UserLoginInterface>({ username: '', password: '' });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogin),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.token) {
          AuthService.login(data.token);
        }
      } else {
        console.error('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userLogin.username}
            onChange={handleFormChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userLogin.password}
            onChange={handleFormChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;