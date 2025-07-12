import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Theme from '../components/Theme';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email === 'staff@clinic.com' && password === '123456') {
      navigate('/calendar');
    } else {
      alert('Wrong email or password');
    }
  }

  return (
    <Theme>
      <div className="login-container">
        {/* Green Welcome Section */}
        <div className="welcome-section">
          <div className="logo-content">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="55" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
              <rect x="45" y="30" width="30" height="60" rx="5" fill="white"/>
              <rect x="30" y="45" width="60" height="30" rx="5" fill="white"/>
              <circle cx="60" cy="60" r="8" fill="#00796B"/>
            </svg>
            <h1>Care & Cure</h1>
            <p>Your Health, Our Priority</p>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="form-section">
          <div className="form-container">
            <h2>Welcome Back</h2>
            <p>Please sign in to continue</p>
            
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>

            <div className="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .login-container {
            display: flex;
            height: 100vh;
            flex-direction: column;
          }

          .welcome-section {
            background: linear-gradient(135deg, #009688 0%, #00796B 100%);
            color: white;
            padding: 40px 20px 60px 20px;
            text-align: center;
            border-bottom-left-radius: 60px;
            border-bottom-right-radius: 60px;
            width: 100vw;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
          }

          .logo-content h1 {
            font-size: 1.8rem;
            font-weight: 700;
            margin: 20px 0 8px 0;
            font-family: "Poppins", sans-serif;
          }

          .logo-content p {
            font-size: 14px;
            margin: 0;
            font-family: "Roboto", sans-serif;
          }

          .form-section {
            background-color: #f8f9fa;
            background-image: radial-gradient(circle, #e0e0e0 1px, transparent 1px);
            background-size: 20px 20px;
            padding: 40px 20px;
            flex: 1;
            margin-top: -30px;
            display: flex;
            justify-content: center;
          }

          .form-container {
            width: 100%;
            max-width: 280px;
            text-align: center;
          }

          .form-container h2 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 6px;
            color: #1a1a1a;
            font-family: "Poppins", sans-serif;
          }

          .form-container p {
            font-size: 14px;
            color: #666;
            margin: 0 0 30px 0;
            font-family: "Roboto", sans-serif;
          }

          .input-group {
            margin-bottom: 20px;
            text-align: left;
          }

          .input-group label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
            font-family: "Roboto", sans-serif;
          }

          .input-group input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
            color: #111827;
            background-color: #fafafa;
            font-family: "Roboto", sans-serif;
            box-sizing: border-box;
          }

          .input-group input:focus {
            border-color: #009688;
            background-color: #ffffff;
            outline: none;
          }

          .login-button {
            width: 100%;
            padding: 14px;
            background-color: #009688;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            font-family: "Poppins", sans-serif;
            margin-bottom: 20px;
          }

          .login-button:hover {
            background-color: #00796b;
          }

          .forgot-password {
            border-top: 1px solid #f3f4f6;
            padding-top: 12px;
          }

          .forgot-password a {
            color: #009688;
            text-decoration: none;
            font-size: 14px;
            font-family: "Roboto", sans-serif;
            font-weight: 500;
          }

          /* Desktop View */
          @media (min-width: 768px) {
            body, html {
              background-image: radial-gradient(circle, #d0d0d0 1px, transparent 1px);
              background-size: 20px 20px;
            }

            .login-container {
              flex-direction: row;
            }

            .welcome-section {
              width: 40%;
              height: 100vh;
              border-radius: 0;
              padding: 40px;
              transform: none;
              left: auto;
              position: static;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .logo-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }

            .logo-content svg {
              width: 150px;
              height: 150px;
              margin-bottom: 8px;
            }

            .logo-content h1 {
              font-size: 2.8rem;
              margin-bottom: 2px;
              font-weight: 800;
            }

            .logo-content p {
              font-size: 18px;
            }

            .form-section {
              width: 60%;
              background-color: white;
              background-image: none;
              align-items: center;
              margin-top: 0;
            }

            .form-container {
              max-width: 320px;
              padding: 25px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            }
          }
        `}
      </style>
    </Theme>
  );
}

export default LoginPage;
