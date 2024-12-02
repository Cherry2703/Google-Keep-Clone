import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectMessage, setRedirectMessage] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(()=>{
    const token = Cookies.get('jwtToken')
    if(token!== undefined){
      navigate('/')
    }
  },[navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    try {
      const response = await fetch('https://google-keep-clone-1.onrender.com/login', options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      Cookies.set('jwtToken',data.jwtToken,{expires:30})
      setRedirectMessage('Login successful! Redirecting to dashboard in 5 seconds...');
      setTimeout(() => {
        navigate('/'); 
      }, 5000); 

    } catch (error) {
      console.error('Error:', error);
      setRedirectMessage('Login failed. Please try again.'); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-text">
          Don’t have an account? <Link to="/sign-up" className="signup-link">Sign Up</Link>
        </p>
        {redirectMessage && <p className="redirect-message">{redirectMessage}</p>} 
      </div>
    </div>
  );
};

export default Login;
