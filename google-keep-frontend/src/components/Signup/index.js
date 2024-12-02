import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [redirectMessage, setRedirectMessage] = useState(''); // State for redirect message
  const navigate = useNavigate(); // Hook for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value, // Update the specific field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const url = 'https://google-keep-clone-1.onrender.com/sign-up';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo)
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json(); // Assuming the server returns JSON

      // Set redirect message and redirect after 5 seconds
      setRedirectMessage('Sign up successful! Redirecting to login in 5 seconds...');
      setTimeout(() => {
        navigate('/login'); // Change to your desired route
      }, 5000); // 5000 milliseconds = 5 seconds

    } catch (error) {
      console.error('Error:', error);
      setRedirectMessage('Signup failed. Please try again.'); // Set error message
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userInfo.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-text">
          Already have an account? <Link to="/login" className="login-link">Log In</Link>
        </p>
        {redirectMessage && <p className="redirect-message">{redirectMessage}</p>} {/* Display redirect message */}
      </div>
    </div>
  );
};

export default Signup;
