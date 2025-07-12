import React, { useState } from 'react';
import AppointmentForm from './appointmentform';

function MobileView({ appointments, onAddAppointment, onEditAppointment, onDeleteAppointment }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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

  const formatTime = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour12 = parseInt(hours);
    const ampm = hour12 >= 12 ? 'PM' : 'AM';
    const displayHour = hour12 === 0 ? 12 : hour12 > 12 ? hour12 - 12 : hour12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const { weekday, dateString } = formatDateParts(currentDate);

  function handleEditAppointment(appointmentIndex, newData) {
    if (onEditAppointment) {
      onEditAppointment(currentDate, appointmentIndex, newData);
    }
  }

  function handleDeleteAppointment(appointmentIndex) {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      if (onDeleteAppointment) {
        onDeleteAppointment(currentDate, appointmentIndex);
      }
    }
  }

  function startEditAppointment(appointment, index) {
    setEditingAppointment({ ...appointment, index });
    setSelectedDate(currentDate);
  }

  return (
    <div className="mobile-view">

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
                <div className="appointment-main-content">
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
                {!isPastDate && (
                  <div className="appointment-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => startEditAppointment(appointment, index)}
                      title="Edit Appointment"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                      Edit
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteAppointment(index)}
                      title="Delete Appointment"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>


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

      {selectedDate && (
        <AppointmentForm
          date={selectedDate}
          editingAppointment={editingAppointment}
          onClose={() => {
            setSelectedDate(null);
            setEditingAppointment(null);
          }}
          onSave={(date, data) => {
            if (editingAppointment) {
              handleEditAppointment(editingAppointment.index, data);
            } else {
              onAddAppointment(date, data);
            }
            setEditingAppointment(null);
          }}
        />
      )}

      <style>
        {`
          .mobile-view {
            min-height: calc(100vh - 80px);
            background-color: var(--background-secondary);
            font-family: var(--body-font);
            padding-top: 20px;
            padding-bottom: 80px;
            color: var(--text-color);
          }

          .date-navigation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            background-color: var(--card-background);
            box-shadow: var(--shadow);
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
            box-shadow: 0 2px 8px rgba(38, 166, 154, 0.4);
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
            background-color: var(--card-background);
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
            background-color: var(--card-background);
            border-radius: 12px;
            padding: 0;
            box-shadow: var(--shadow);
            border-left: 4px solid var(--primary-color);
            transition: all 0.2s ease;
            overflow: hidden;
          }

          .appointment-card:hover {
            box-shadow: var(--shadow-hover);
            transform: translateY(-2px);
          }

          .appointment-main-content {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 16px;
          }

          .appointment-time {
            background-color: rgba(38, 166, 154, 0.1);
            color: var(--primary-color);
            padding: 8px 12px;
            border-radius: 8px;
            font-weight: var(--body-weight-medium);
            font-size: 0.9rem;
            min-width: 70px;
            text-align: center;
            flex-shrink: 0;
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
            color: var(--text-secondary);
            font-size: 0.9rem;
          }

          .appointment-status {
            background-color: rgba(25, 118, 210, 0.1);
            color: #1976d2;
            padding: 6px 10px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: var(--body-weight-medium);
            flex-shrink: 0;
          }

          .appointment-actions {
            display: flex;
            gap: 0;
            border-top: 1px solid var(--border-color);
            background-color: var(--background-tertiary);
          }

          .action-btn {
            flex: 1;
            padding: 12px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.2s ease;
            color: var(--text-secondary);
          }

          .action-btn:hover {
            background-color: var(--card-background);
          }

          .edit-btn {
            border-right: 1px solid var(--border-color);
          }

          .edit-btn:hover {
            color: #1976d2;
            background-color: rgba(25, 118, 210, 0.1);
          }

          .delete-btn:hover {
            color: #d32f2f;
            background-color: rgba(211, 47, 47, 0.1);
          }

          .bottom-action-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: var(--card-background);
            padding: 15px;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 100;
            border-top: 1px solid var(--border-color);
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
            background-color: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(38, 166, 154, 0.3);
          }

          .past-date-notice {
            width: 100%;
            padding: 15px;
            background-color: var(--background-tertiary);
            color: var(--muted-text-color);
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
