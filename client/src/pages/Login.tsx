import React, { useState } from 'react';
import AuthService from '../utils/auth';

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userLogin.username}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userLogin.password}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;