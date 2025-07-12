import React, { useState, useEffect } from 'react';
import AppointmentForm from '../components/appointmentform';
import MobileView from '../components/mobileview';
import Header from '../components/Header';
import Theme from '../components/Theme';

function CalendarPage() {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedViewDate, setSelectedViewDate] = useState(new Date());
  const [editingAppointment, setEditingAppointment] = useState(null);


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  function handleAddAppointment(date, data) {
    const key = date.toISOString().split('T')[0];
    const updated = { ...appointments };
    updated[key] = [...(updated[key] || []), data];
    setAppointments(updated);
  }

  function handleEditAppointment(date, appointmentIndex, newData) {
    const key = date.toISOString().split('T')[0];
    const updated = { ...appointments };
    updated[key][appointmentIndex] = newData;
    setAppointments(updated);
  }

  function handleDeleteAppointment(date, appointmentIndex) {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      const key = date.toISOString().split('T')[0];
      const updated = { ...appointments };
      updated[key].splice(appointmentIndex, 1);
      if (updated[key].length === 0) {
        delete updated[key];
      }
      setAppointments(updated);
    }
  }

  function startEditAppointment(appointment, index) {
    setEditingAppointment({ ...appointment, index });
    setSelectedDate(selectedViewDate);
  }

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const boxes = [];

  const formatTime = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour12 = parseInt(hours);
    const ampm = hour12 >= 12 ? 'PM' : 'AM';
    const displayHour = hour12 === 0 ? 12 : hour12 > 12 ? hour12 - 12 : hour12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

 
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayNumber = daysInPrevMonth - i;
    boxes.push(
      <div key={`prev-${dayNumber}`} className="calendar-day prev-month">
        <div className="day-number">{dayNumber}</div>
      </div>
    );
  }


  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const key = date.toISOString().split('T')[0];
    const dayAppointments = appointments[key] || [];
    const isToday = new Date().toDateString() === date.toDateString();
    const isSelected = selectedViewDate.toDateString() === date.toDateString();
    const isPast = date < new Date().setHours(0, 0, 0, 0);
    
    boxes.push(
      <div 
        key={d} 
        className={`calendar-day current-month ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isPast ? 'past' : ''}`}
        onClick={() => {
          setSelectedViewDate(date);
         
          if (!isPast) {
            setSelectedDate(date);
          }
        }}
      >
        <div className="day-number">{d}</div>
        <div className="appointments-list">
          {dayAppointments.map((appointment, i) => (
            <div key={i} className="appointment-item">
              {formatTime(appointment.time)} - {appointment.patient}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const totalCells = 42; 
  const remainingCells = totalCells - boxes.length;
  
  for (let d = 1; d <= remainingCells; d++) {
    boxes.push(
      <div key={`next-${d}`} className="calendar-day next-month">
        <div className="day-number">{d}</div>
      </div>
    );
  }

  return (
    <Theme>
      <div className="calendar-page">
        <Header />
        
        {isMobile ? (
          <MobileView 
            appointments={appointments}
            onAddAppointment={handleAddAppointment}
            onEditAppointment={handleEditAppointment}
            onDeleteAppointment={handleDeleteAppointment}
          />
        ) : (
          <div className="calendar-container">
     
            <div className="main-content">
           
              <div className="calendar-section">
       
                <div className="calendar-nav">
                  <button 
                    className="nav-btn"
                    onClick={() => navigateMonth(-1)}
                  >
                    ←
                  </button>
                  <h2 className="month-year">
                    {monthNames[month]} {year}
                  </h2>
                  <button 
                    className="nav-btn"
                    onClick={() => navigateMonth(1)}
                  >
                    →
                  </button>
                </div>

                <div className="calendar-grid">
         
                  {dayNames.map(day => (
                    <div key={day} className="day-header">
                      {day}
                    </div>
                  ))}
                  

                  {boxes}
                </div>
              </div>

              <div className="appointments-sidebar">
                <div className="sidebar-header">
                  <h3>Appointments</h3>
                  <p>{selectedViewDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}</p>
                </div>

                <div className="selected-appointments">
                  {(() => {
                    const selectedKey = selectedViewDate.toISOString().split('T')[0];
                    const selectedAppointments = appointments[selectedKey] || [];
                    const isPastDate = selectedViewDate < new Date().setHours(0, 0, 0, 0);
                    
                    if (selectedAppointments.length === 0) {
                      return (
                        <div className="no-appointments-selected">
                          <p>No appointments scheduled for this date</p>
                          {isPastDate && (
                            <p className="past-date-notice">Past dates cannot have new appointments added</p>
                          )}
                        </div>
                      );
                    }

                    return selectedAppointments.map((appointment, index) => (
                      <div key={index} className="appointment-card">
                        <div className="appointment-main-content">
                          <div className="appointment-time-large">
                            {formatTime(appointment.time)}
                          </div>
                          <div className="appointment-info">
                            <div className="patient-name-large">{appointment.patient}</div>
                            <div className="doctor-name-large">Dr. {appointment.doctor}</div>
                          </div>
                          <div className="appointment-status-large">
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
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                              </svg>
                              Edit
                            </button>
                            <button 
                              className="action-btn delete-btn"
                              onClick={() => handleDeleteAppointment(selectedViewDate, index)}
                              title="Delete Appointment"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                              </svg>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ));
                  })()}
                </div>

                {(() => {
                  const isPastDate = selectedViewDate < new Date().setHours(0, 0, 0, 0);
                  
                  if (isPastDate) {
                    return (
                      <div className="past-date-button">
                        <p>Cannot add appointments to past dates</p>
                      </div>
                    );
                  }
                  
                  return (
                    <button 
                      className="add-appointment"
                      onClick={() => setSelectedDate(selectedViewDate)}
                    >
                      + Add Appointment
                    </button>
                  );
                })()}
              </div>
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
                    handleEditAppointment(date, editingAppointment.index, data);
                  } else {
                    handleAddAppointment(date, data);
                  }
                  setEditingAppointment(null);
                }}
              />
            )}
          </div>
        )}

        <style>
          {`
            .calendar-page {
              height: 100vh;
              background-color: var(--background-secondary);
              font-family: var(--body-font);
              overflow: hidden;
              color: var(--text-color);
            }

            .calendar-container {
              max-width: 1400px;
              margin: 0 auto;
              padding: 15px;
              height: calc(100vh - 80px);
              overflow: hidden;
            }

            .main-content {
              display: flex;
              gap: 15px;
              height: 100%;
            }

            .calendar-section {
              flex: 1;
              background: var(--card-background);
              border-radius: 8px;
              padding: 15px;
              box-shadow: var(--shadow);
              display: flex;
              flex-direction: column;
              overflow: hidden;
            }

            .calendar-nav {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 15px;
              padding-bottom: 10px;
              border-bottom: 1px solid var(--border-color);
              flex-shrink: 0;
            }

            .nav-btn {
              background-color: var(--background-tertiary);
              border: 1px solid var(--border-color);
              width: 40px;
              height: 40px;
              border-radius: 50%;
              font-size: 1.2rem;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.2s ease;
              color: var(--text-color);
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .nav-btn:hover {
              background-color: var(--primary-color);
              color: white;
              border-color: var(--primary-color);
              transform: scale(1.05);
            }

            .month-year {
              font-family: var(--heading-font);
              font-size: 1.5rem;
              font-weight: 600;
              color: var(--text-color);
              margin: 0;
            }

            .calendar-grid {
              display: grid;
              grid-template-columns: repeat(7, 1fr);
              border: 1px solid var(--border-color);
              border-radius: 4px;
              overflow: hidden;
              flex: 1;
              grid-template-rows: auto repeat(6, 1fr);
            }

            .day-header {
              background-color: var(--background-tertiary);
              color: var(--text-secondary);
              padding: 8px 4px;
              text-align: center;
              font-weight: 600;
              font-size: 0.75rem;
              border-right: 1px solid var(--border-color);
              border-bottom: 1px solid var(--border-color);
            }

            .day-header:last-child {
              border-right: none;
            }

            .calendar-day {
              background-color: var(--card-background);
              padding: 6px;
              border-right: 1px solid var(--border-color);
              border-bottom: 1px solid var(--border-color);
              position: relative;
              cursor: pointer;
              display: flex;
              flex-direction: column;
              overflow: hidden;
              transition: all 0.2s ease;
            }

            .calendar-day.current-month {
              background-color: var(--card-background);
            }

            .calendar-day.prev-month,
            .calendar-day.next-month {
              background-color: var(--background-tertiary);
              cursor: default;
              pointer-events: none;
              opacity: 0.5;
            }

            .calendar-day.prev-month .day-number,
            .calendar-day.next-month .day-number {
              color: var(--muted-text-color);
              font-weight: 400;
            }

            .calendar-day:last-child {
              border-right: none;
            }

            .calendar-day.current-month:hover {
              background-color: var(--background-tertiary);
              box-shadow: var(--shadow);
            }

            .calendar-day.past {
              background-color: var(--background-tertiary);
              opacity: 0.7;
              cursor: default;
            }

            .calendar-day.past .day-number {
              color: var(--muted-text-color);
              font-weight: 500;
            }

            .calendar-day.past .appointment-item {
              background-color: var(--border-color);
              color: var(--text-secondary);
              border-left-color: var(--muted-text-color);
            }

            .calendar-day.past:hover {
              background-color: var(--background-tertiary);
              opacity: 0.8;
              box-shadow: none;
            }

            .calendar-day.today {
              background-color: rgba(38, 166, 154, 0.1);
              border: 2px solid var(--primary-color);
            }

            .calendar-day.selected {
              background-color: rgba(25, 118, 210, 0.1);
              border: 2px solid #1976d2;
            }

            .calendar-day.selected.past {
              background-color: rgba(156, 39, 176, 0.1);
              border-color: #9c27b0;
            }

            .day-number {
              font-weight: 700;
              font-size: 1rem;
              color: var(--text-color);
              margin-bottom: 4px;
              flex-shrink: 0;
              text-align: left;
            }

            .calendar-day.today .day-number {
              color: var(--primary-color);
              font-weight: 800;
            }

            .calendar-day.selected .day-number {
              color: #1976d2;
              font-weight: 800;
            }

            .appointments-list {
              display: flex;
              flex-direction: column;
              gap: 2px;
              flex: 1;
              overflow: hidden;
            }

            .appointment-item {
              background-color: rgba(25, 118, 210, 0.1);
              color: #1976d2;
              padding: 2px 4px;
              border-radius: 3px;
              font-size: 0.65rem;
              line-height: 1.2;
              border-left: 2px solid #1976d2;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-weight: 500;
            }

            .appointment-time {
              font-weight: 600;
              font-size: 0.6rem;
            }

            .appointment-patient {
              font-size: 0.65rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-top: 1px;
            }

            /* Appointments Sidebar */
            .appointments-sidebar {
              width: 280px;
              background-color: var(--card-background);
              border-radius: 8px;
              box-shadow: var(--shadow);
              display: flex;
              flex-direction: column;
              overflow: hidden;
            }

            .sidebar-header {
              background-color: var(--primary-color);
              color: white;
              padding: 15px;
              border-radius: 8px 8px 0 0;
              flex-shrink: 0;
            }

            .sidebar-header h3 {
              font-size: 1.1rem;
              font-weight: 600;
              margin: 0 0 3px 0;
            }

            .sidebar-header p {
              margin: 0;
              font-size: 0.8rem;
              opacity: 0.9;
            }

            .selected-appointments {
              padding: 12px;
              flex: 1;
              overflow-y: auto;
            }

            .no-appointments-selected {
              text-align: center;
              padding: 20px 10px;
              color: var(--muted-text-color);
              font-size: 0.85rem;
            }

            .appointment-card {
              background-color: var(--background-tertiary);
              border: 1px solid var(--border-color);
              border-radius: 8px;
              padding: 0;
              margin-bottom: 8px;
              transition: all 0.2s ease;
              overflow: hidden;
            }

            .appointment-card:hover {
              box-shadow: var(--shadow-hover);
              transform: translateY(-1px);
              border-color: var(--border-light);
            }

            .appointment-main-content {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 12px;
            }

            .appointment-time-large {
              background-color: rgba(38, 166, 154, 0.1);
              color: var(--primary-color);
              padding: 6px 8px;
              border-radius: 6px;
              font-weight: 600;
              font-size: 0.75rem;
              min-width: 60px;
              text-align: center;
              flex-shrink: 0;
            }

            .appointment-info {
              flex: 1;
            }

            .patient-name-large {
              font-weight: 600;
              font-size: 0.85rem;
              margin-bottom: 2px;
              color: var(--text-color);
            }

            .doctor-name-large {
              color: var(--text-secondary);
              font-size: 0.75rem;
            }

            .appointment-status-large {
              background-color: rgba(25, 118, 210, 0.1);
              color: #1976d2;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 0.7rem;
              font-weight: 500;
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
              padding: 8px 12px;
              background: none;
              border: none;
              cursor: pointer;
              font-size: 0.75rem;
              font-weight: 500;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 4px;
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

            .add-appointment {
              width: calc(100% - 24px);
              margin: 0 12px 12px 12px;
              padding: 8px;
              background-color: var(--primary-color);
              color: white;
              border: none;
              border-radius: 4px;
              font-size: 0.8rem;
              cursor: pointer;
              transition: background-color 0.2s ease;
              flex-shrink: 0;
            }

            .add-appointment:hover {
              background-color: var(--primary-dark);
            }

            .past-date-notice {
              font-size: 0.75rem;
              color: var(--muted-text-color);
              margin-top: 5px;
              font-style: italic;
            }

            .past-date-button {
              padding: 12px;
              margin: 0 12px 12px 12px;
              background-color: var(--background-tertiary);
              border-radius: 4px;
              text-align: center;
              color: var(--muted-text-color);
              font-size: 0.8rem;
              font-style: italic;
            }

            @media (max-width: 1200px) {
              .main-content {
                flex-direction: column;
                height: auto;
                overflow: auto;
              }

              .calendar-container {
                height: auto;
                overflow: auto;
              }

              .calendar-page {
                height: auto;
                overflow: auto;
              }

              .appointments-sidebar {
                width: 100%;
              }

              .calendar-grid {
                grid-template-rows: auto repeat(6, 80px);
              }
            }

            @media (max-width: 768px) {
              .calendar-container {
                padding: 8px;
              }

              .calendar-section {
                padding: 10px;
              }

              .month-year {
                font-size: 1.2rem;
              }

              .calendar-grid {
                grid-template-rows: auto repeat(6, 70px);
              }

              .day-number {
                font-size: 0.9rem;
              }

              .calendar-day {
                padding: 3px;
              }

              .appointment-item {
                font-size: 0.55rem;
                padding: 1px 2px;
              }

              .appointment-time {
                font-size: 0.5rem;
              }

              .appointment-patient {
                font-size: 0.55rem;
              }
            }
          `}
        </style>
      </div>
    </Theme>
  );
}

export default CalendarPage;
