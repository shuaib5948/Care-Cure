import React, { useState } from 'react';
import { patients, doctors } from '../data/lists';

function AppointmentForm({ date, onClose, onSave }) {
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [time, setTime] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!patient || !doctor || !time) {
      alert('Please fill all required fields');
      return;
    }
    onSave(date, { patient, doctor, time });
    onClose();
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="appointment-form">
        <div className="form-header">
          <h3>Schedule Appointment</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="selected-date">
          <strong>Date: </strong>{formatDate(date)}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient *</label>
            <select
              value={patient}
              onChange={e => setPatient(e.target.value)}
              required
            >
              <option value="">Select Patient</option>
              {patients.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Doctor *</label>
            <select
              value={doctor}
              onChange={e => setDoctor(e.target.value)}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map(d => <option key={d} value={d}>Dr. {d}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Time *</label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
              min="08:00"
              max="18:00"
              step="300"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Schedule Appointment
            </button>
          </div>
        </form>

        <style>
          {`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.6);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
              padding: 20px;
            }

            .appointment-form {
              background: white;
              border-radius: 16px;
              width: 100%;
              max-width: 480px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
              overflow: hidden;
              animation: slideUp 0.3s ease-out;
            }

            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .form-header {
              background: linear-gradient(135deg, #009688 0%, #00796B 100%);
              color: white;
              padding: 24px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .form-header h3 {
              font-family: var(--heading-font);
              font-size: 1.5rem;
              font-weight: var(--heading-weight-semibold);
              margin: 0;
            }

            .close-button {
              background: none;
              border: none;
              color: white;
              font-size: 2rem;
              cursor: pointer;
              padding: 0;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              transition: background-color 0.3s ease;
            }

            .close-button:hover {
              background-color: rgba(255, 255, 255, 0.2);
            }

            .selected-date {
              background-color: #f8f9fa;
              padding: 16px 24px;
              border-bottom: 1px solid #e9ecef;
              font-size: 1rem;
              color: var(--text-color);
            }

            .appointment-form form {
              padding: 24px;
            }

            .form-group {
              margin-bottom: 20px;
            }

            .form-group label {
              display: block;
              font-weight: var(--body-weight-medium);
              color: var(--text-color);
              margin-bottom: 8px;
              font-size: 0.95rem;
            }

            .form-group select,
            .form-group input {
              width: 100%;
              padding: 12px 16px;
              border: 2px solid #e9ecef;
              border-radius: 8px;
              font-size: 1rem;
              color: var(--text-color);
              background-color: white;
              transition: border-color 0.3s ease;
              box-sizing: border-box;
            }

            .form-group select:focus,
            .form-group input:focus {
              outline: none;
              border-color: var(--primary-color);
              box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.1);
            }

            .form-actions {
              display: flex;
              gap: 12px;
              margin-top: 30px;
            }

            .cancel-btn {
              flex: 1;
              padding: 12px 20px;
              background-color: #f8f9fa;
              border: 2px solid #e9ecef;
              color: var(--text-color);
              border-radius: 8px;
              font-size: 1rem;
              font-weight: var(--body-weight-medium);
              cursor: pointer;
              transition: all 0.3s ease;
            }

            .cancel-btn:hover {
              background-color: #e9ecef;
              border-color: #dee2e6;
            }

            .save-btn {
              flex: 2;
              padding: 12px 20px;
              background-color: var(--primary-color);
              color: white;
              border: none;
              border-radius: 8px;
              font-size: 1rem;
              font-weight: var(--body-weight-medium);
              cursor: pointer;
              transition: all 0.3s ease;
            }

            .save-btn:hover {
              background-color: #00796B;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 150, 136, 0.3);
            }

            @media (max-width: 768px) {
              .appointment-form {
                max-width: 100%;
                margin: 0 10px;
              }

              .form-header {
                padding: 20px;
              }

              .form-header h3 {
                font-size: 1.3rem;
              }

              .appointment-form form {
                padding: 20px;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default AppointmentForm;
