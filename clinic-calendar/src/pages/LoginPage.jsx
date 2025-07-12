import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Theme from '../components/Theme';
import DarkModeToggle from '../components/DarkModeToggle';

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
      
        <div className="theme-toggle-container">
          <DarkModeToggle />
        </div>

        <div className="welcome-section">
          <div className="logo-content">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="55" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
              <rect x="45" y="30" width="30" height="60" rx="5" fill="white"/>
              <rect x="30" y="45" width="60" height="30" rx="5" fill="white"/>
              <circle cx="60" cy="60" r="8" fill="var(--primary-dark)"/>
            </svg>
            <h1>Care & Cure</h1>
            <p>Your Health, Our Priority</p>
          </div>
        </div>

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
            background-color: var(--background-color);
            color: var(--text-color);
            position: relative;
          }

          .theme-toggle-container {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 10;
          }

          .welcome-section {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
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
            font-family: var(--heading-font);
          }

          .logo-content p {
            font-size: 14px;
            margin: 0;
            font-family: var(--body-font);
          }

          .form-section {
            background-color: var(--background-secondary);
            background-image: radial-gradient(circle, var(--border-color) 1px, transparent 1px);
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
            background-color: var(--card-background);
            padding: 20px;
            border-radius: 12px;
            box-shadow: var(--shadow);
          }

          .form-container h2 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 6px;
            color: var(--text-color);
            font-family: var(--heading-font);
          }

          .form-container p {
            font-size: 14px;
            color: var(--text-secondary);
            margin: 0 0 30px 0;
            font-family: var(--body-font);
          }

          .input-group {
            margin-bottom: 20px;
            text-align: left;
          }

          .input-group label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-color);
            margin-bottom: 8px;
            font-family: var(--body-font);
          }

          .input-group input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            font-size: 16px;
            color: var(--text-color);
            background-color: var(--input-background);
            font-family: var(--body-font);
            box-sizing: border-box;
            transition: all 0.3s ease;
          }

          .input-group input:focus {
            border-color: var(--primary-color);
            background-color: var(--background-color);
            outline: none;
            box-shadow: 0 0 0 3px rgba(38, 166, 154, 0.1);
          }

          .input-group input::placeholder {
            color: var(--muted-text-color);
          }

          .login-button {
            width: 100%;
            padding: 14px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            font-family: var(--heading-font);
            margin-bottom: 20px;
            transition: all 0.3s ease;
          }

          .login-button:hover {
            background-color: var(--primary-dark);
            transform: translateY(-1px);
            box-shadow: var(--shadow-hover);
          }

          .login-button:active {
            transform: translateY(0);
          }

          .forgot-password {
            border-top: 1px solid var(--border-light);
            padding-top: 12px;
          }

          .forgot-password a {
            color: var(--primary-color);
            text-decoration: none;
            font-size: 14px;
            font-family: var(--body-font);
            font-weight: 500;
            transition: color 0.3s ease;
          }

          .forgot-password a:hover {
            color: var(--primary-dark);
          }

          /* Desktop View */
          @media (min-width: 768px) {
            body, html {
              background-color: var(--background-secondary);
              background-image: radial-gradient(circle, var(--border-light) 1px, transparent 1px);
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
              background-color: var(--background-color);
              background-image: none;
              align-items: center;
              margin-top: 0;
            }

            .form-container {
              max-width: 320px;
              padding: 25px;
              box-shadow: var(--shadow-hover);
            }

            .theme-toggle-container {
              top: 30px;
              right: 30px;
            }
          }

          @media (max-width: 480px) {
            .theme-toggle-container {
              top: 15px;
              right: 15px;
            }

            .form-container {
              padding: 15px;
              margin: 0 10px;
            }
          }
        `}
      </style>
    </Theme>
  );
}

export default LoginPage;
