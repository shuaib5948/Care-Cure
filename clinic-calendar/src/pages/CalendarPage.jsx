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

  // Check if device is mobile
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

  // Helper function to convert 24-hour time to 12-hour AM/PM format
  const formatTime = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour12 = parseInt(hours);
    const ampm = hour12 >= 12 ? 'PM' : 'AM';
    const displayHour = hour12 === 0 ? 12 : hour12 > 12 ? hour12 - 12 : hour12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Previous month's trailing days
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

  // Current month days
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
          // Only allow setting selectedDate for current/future dates
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

  // Next month's leading days to fill the grid
  const totalCells = 42; // 6 rows × 7 days
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
          />
        ) : (
          <div className="calendar-container">
            {/* Main Content - Calendar and Today's Appointments */}
            <div className="main-content">
              {/* Calendar Section */}
              <div className="calendar-section">
                {/* Calendar Navigation */}
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

                {/* Calendar Grid */}
                <div className="calendar-grid">
                  {/* Day headers */}
                  {dayNames.map(day => (
                    <div key={day} className="day-header">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {boxes}
                </div>
              </div>

              {/* Appointments Sidebar */}
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

            {/* Appointment Form Modal */}
            {selectedDate && (
              <AppointmentForm
                date={selectedDate}
                onClose={() => setSelectedDate(null)}
                onSave={handleAddAppointment}
              />
            )}
          </div>
        )}

        <style>
          {`
            .calendar-page {
              height: 100vh;
              background-color: #f5f5f5;
              font-family: var(--body-font);
              overflow: hidden;
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
              background: white;
              border-radius: 8px;
              padding: 15px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
              border-bottom: 1px solid #e0e0e0;
              flex-shrink: 0;
            }

            .nav-btn {
              background-color: #f8f9fa;
              border: 1px solid #ddd;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              font-size: 1.2rem;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.2s ease;
              color: #333;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .nav-btn:hover {
              background-color: #009688;
              color: white;
              border-color: #009688;
              transform: scale(1.05);
            }

            .month-year {
              font-family: var(--heading-font);
              font-size: 1.5rem;
              font-weight: 600;
              color: #333;
              margin: 0;
            }

            .calendar-grid {
              display: grid;
              grid-template-columns: repeat(7, 1fr);
              border: 1px solid #ddd;
              border-radius: 4px;
              overflow: hidden;
              flex: 1;
              grid-template-rows: auto repeat(6, 1fr);
            }

            .day-header {
              background-color: #f8f9fa;
              color: #666;
              padding: 8px 4px;
              text-align: center;
              font-weight: 600;
              font-size: 0.75rem;
              border-right: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
            }

            .day-header:last-child {
              border-right: none;
            }

            .calendar-day {
              background-color: white;
              padding: 6px;
              border-right: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
              position: relative;
              cursor: pointer;
              display: flex;
              flex-direction: column;
              overflow: hidden;
              transition: all 0.2s ease;
            }

            .calendar-day.current-month {
              background-color: white;
            }

            .calendar-day.prev-month,
            .calendar-day.next-month {
              background-color: #f9f9f9;
              cursor: default;
              pointer-events: none;
            }

            .calendar-day.prev-month .day-number,
            .calendar-day.next-month .day-number {
              color: #ccc;
              font-weight: 400;
            }

            .calendar-day:last-child {
              border-right: none;
            }

            .calendar-day.current-month:hover {
              background-color: #f8f9fa;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .calendar-day.past {
              background-color: #fafafa;
              opacity: 0.7;
              cursor: default;
            }

            .calendar-day.past .day-number {
              color: #999;
              font-weight: 500;
            }

            .calendar-day.past .appointment-item {
              background-color: #e0e0e0;
              color: #757575;
              border-left-color: #bdbdbd;
            }

            .calendar-day.past:hover {
              background-color: #f0f0f0;
              opacity: 0.8;
              box-shadow: none;
            }

            .calendar-day.today {
              background-color: #e8f5e8;
            }

            .calendar-day.selected {
              background-color: #e3f2fd;
              border: 2px solid #1976d2;
            }

            .calendar-day.selected.past {
              background-color: #f3e5f5;
              border-color: #9c27b0;
            }

            .day-number {
              font-weight: 700;
              font-size: 1rem;
              color: #333;
              margin-bottom: 4px;
              flex-shrink: 0;
              text-align: left;
            }

            .calendar-day.today .day-number {
              color: #009688;
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
              background-color: #e3f2fd;
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
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              display: flex;
              flex-direction: column;
              overflow: hidden;
            }

            .sidebar-header {
              background-color: #009688;
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
              color: #999;
              font-size: 0.85rem;
            }

            .appointment-card {
              background-color: #f8f9fa;
              border: 1px solid #e0e0e0;
              border-radius: 4px;
              padding: 8px;
              margin-bottom: 6px;
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .appointment-time-large {
              background-color: #e8f5e8;
              color: #009688;
              padding: 4px 6px;
              border-radius: 4px;
              font-weight: 600;
              font-size: 0.75rem;
              min-width: 50px;
              text-align: center;
            }

            .appointment-info {
              flex: 1;
            }

            .patient-name-large {
              font-weight: 600;
              font-size: 0.8rem;
              margin-bottom: 1px;
              color: #333;
            }

            .doctor-name-large {
              color: #666;
              font-size: 0.7rem;
            }

            .appointment-status-large {
              background-color: #e3f2fd;
              color: #1976d2;
              padding: 2px 6px;
              border-radius: 8px;
              font-size: 0.65rem;
              font-weight: 500;
            }

            .add-appointment {
              width: calc(100% - 24px);
              margin: 0 12px 12px 12px;
              padding: 8px;
              background-color: #009688;
              color: white;
              border: none;
              border-radius: 4px;
              font-size: 0.8rem;
              cursor: pointer;
              transition: background-color 0.2s ease;
              flex-shrink: 0;
            }

            .add-appointment:hover {
              background-color: #00796B;
            }

            .past-date-notice {
              font-size: 0.75rem;
              color: #999;
              margin-top: 5px;
              font-style: italic;
            }

            .past-date-button {
              padding: 12px;
              margin: 0 12px 12px 12px;
              background-color: #f5f5f5;
              border-radius: 4px;
              text-align: center;
              color: #999;
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
