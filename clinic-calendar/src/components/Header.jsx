import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  return (
    <div className="header">
      <div className="header-left">
        <div className="clinic-logo">
          <svg width="40" height="40" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="55" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
            <rect x="45" y="30" width="30" height="60" rx="5" fill="white"/>
            <rect x="30" y="45" width="60" height="30" rx="5" fill="white"/>
            <circle cx="60" cy="60" r="8" fill="#00796B"/>
          </svg>
        </div>
        <div className="clinic-info">
          <h1>Care & Cure</h1>
          <p>Appointment Management System</p>
        </div>
      </div>

      <div className="header-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <style>
        {`
          .header {
            background: linear-gradient(135deg, #009688 0%, #00796B 100%);
            color: white;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 100;
          }

          .header-left {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .clinic-logo {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .clinic-info h1 {
            font-family: var(--heading-font);
            font-size: 1.8rem;
            font-weight: var(--heading-weight-bold);
            margin: 0;
            line-height: 1.2;
          }

          .clinic-info p {
            font-size: 0.9rem;
            margin: 0;
            opacity: 0.9;
            line-height: 1.2;
          }

          .header-right {
            display: flex;
            align-items: center;
          }

          .logout-btn {
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 0.95rem;
            font-weight: var(--body-weight-medium);
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: var(--body-font);
          }

          .logout-btn:hover {
            background-color: rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-1px);
          }

          @media (max-width: 768px) {
            .header {
              padding: 12px 20px;
            }

            .clinic-logo svg {
              width: 32px;
              height: 32px;
            }

            .clinic-info h1 {
              font-size: 1.4rem;
            }

            .clinic-info p {
              font-size: 0.8rem;
            }

            .logout-btn {
              padding: 8px 16px;
              font-size: 0.9rem;
            }
          }

          @media (max-width: 480px) {
            .header-left {
              gap: 10px;
            }

            .clinic-logo svg {
              width: 28px;
              height: 28px;
            }

            .clinic-info h1 {
              font-size: 1.2rem;
            }

            .clinic-info p {
              display: none;
            }

            .logout-btn {
              padding: 6px 12px;
              font-size: 0.85rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Header;
