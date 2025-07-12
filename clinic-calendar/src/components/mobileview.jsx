import React, { useState } from 'react';
import AppointmentForm from './appointmentform';

function MobileView({ appointments, onAddAppointment }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Split date formatting into two parts
  const formatDateParts = (date) => {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    return { weekday, dateString };
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const dateKey = currentDate.toISOString().split('T')[0];
  const dayAppointments = appointments[dateKey] || [];
  const isPastDate = currentDate < new Date().setHours(0, 0, 0, 0);

  // Helper function to convert 24-hour time to 12-hour AM/PM format
  const formatTime = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour12 = parseInt(hours);
    const ampm = hour12 >= 12 ? 'PM' : 'AM';
    const displayHour = hour12 === 0 ? 12 : hour12 > 12 ? hour12 - 12 : hour12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const { weekday, dateString } = formatDateParts(currentDate);

  return (
    <div className="mobile-view">
      {/* Date Navigation */}
      <div className="date-navigation">
        <button className="nav-button" onClick={() => navigateDate(-1)}>
          ←
        </button>
        <div className="current-date">
          <div className="weekday">{weekday}</div>
          <div className="date-string">{dateString}</div>
        </div>
        <button className="nav-button" onClick={() => navigateDate(1)}>
          →
        </button>
      </div>

      <div className="mobile-actions">
        <button className="today-button" onClick={goToToday}>
          Today
        </button>
      </div>

      {/* Appointments List */}
      <div className="appointments-section">
        <h3>Appointments ({dayAppointments.length})</h3>
        {dayAppointments.length === 0 ? (
          <div className="no-appointments">
            <p>No appointments scheduled for this day</p>
          </div>
        ) : (
          <div className="appointments-list">
            {dayAppointments.map((appointment, index) => (
              <div key={index} className="appointment-card">
                <div className="appointment-time">
                  {formatTime(appointment.time)}
                </div>
                <div className="appointment-details">
                  <div className="patient-name">{appointment.patient}</div>
                  <div className="doctor-name">Dr. {appointment.doctor}</div>
                </div>
                <div className="appointment-status">
                  {isPastDate ? 'Completed' : 'Scheduled'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="bottom-action-bar">
        {!isPastDate ? (
          <button
            className="add-appointment-button"
            onClick={() => setSelectedDate(currentDate)}
          >
            + Add Appointment
          </button>
        ) : (
          <div className="past-date-notice">
            Cannot add appointments to past dates
          </div>
        )}
      </div>

      {/* Appointment Form Modal */}
      {selectedDate && (
        <AppointmentForm
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onSave={onAddAppointment}
        />
      )}

      <style>
        {`
          .mobile-view {
            min-height: calc(100vh - 80px);
            background-color: #f8f9fa;
            font-family: var(--body-font);
            padding-top: 20px;
            padding-bottom: 80px;
          }

          .date-navigation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            background-color: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            margin: 0 10px;
            border-radius: 12px;
            margin-bottom: 20px;
          }

          .nav-button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .nav-button:hover {
            transform: scale(1.1);
            box-shadow: 0 2px 8px rgba(0, 150, 136, 0.4);
          }

          .current-date {
            text-align: center;
            flex: 1;
          }

          .weekday {
            font-family: var(--heading-font);
            font-size: 1.2rem;
            font-weight: var(--heading-weight-semibold);
            color: var(--primary-color);
            margin: 0;
            line-height: 1.2;
          }

          .date-string {
            font-family: var(--body-font);
            font-size: 0.9rem;
            font-weight: var(--body-weight-normal);
            color: var(--text-color);
            margin: 2px 0 0 0;
            line-height: 1.2;
          }

          .mobile-actions {
            display: flex;
            gap: 10px;
            padding: 0 10px 20px 10px;
            justify-content: center;
          }

          .today-button {
            padding: 12px 24px;
            background-color: white;
            border: 2px solid var(--primary-color);
            color: var(--primary-color);
            border-radius: 8px;
            font-size: 1rem;
            font-weight: var(--body-weight-medium);
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .today-button:hover {
            background-color: var(--primary-color);
            color: white;
          }

          .appointments-section {
            padding: 0 10px 20px 10px;
          }

          .appointments-section h3 {
            font-family: var(--heading-font);
            font-size: 1.3rem;
            font-weight: var(--heading-weight-semibold);
            color: var(--text-color);
            margin: 0 0 15px 0;
          }

          .no-appointments {
            text-align: center;
            padding: 40px 20px;
            color: var(--muted-text-color);
          }

          .appointments-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .appointment-card {
            background-color: white;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-left: 4px solid var(--primary-color);
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .appointment-time {
            background-color: #e8f5e8;
            color: var(--primary-color);
            padding: 8px 12px;
            border-radius: 8px;
            font-weight: var(--body-weight-medium);
            font-size: 0.9rem;
            min-width: 60px;
            text-align: center;
          }

          .appointment-details {
            flex: 1;
          }

          .patient-name {
            font-weight: var(--body-weight-medium);
            color: var(--text-color);
            font-size: 1rem;
            margin-bottom: 2px;
          }

          .doctor-name {
            color: var(--muted-text-color);
            font-size: 0.9rem;
          }

          .appointment-status {
            background-color: #e3f2fd;
            color: #1976d2;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: var(--body-weight-medium);
          }

          .bottom-action-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: white;
            padding: 15px;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 100;
          }

          .add-appointment-button {
            width: 100%;
            padding: 15px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: var(--body-weight-medium);
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .add-appointment-button:hover {
            background-color: #00796B;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 150, 136, 0.3);
          }

          .past-date-notice {
            width: 100%;
            padding: 15px;
            background-color: #f5f5f5;
            color: #999;
            border-radius: 8px;
            font-size: 1rem;
            text-align: center;
            font-style: italic;
          }
        `}
      </style>
    </div>
  );
}

export default MobileView;
