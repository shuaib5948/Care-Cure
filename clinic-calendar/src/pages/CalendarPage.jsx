import React, { useState, useEffect } from 'react';
import AppointmentForm from '../components/appointmentform';
import MobileView from '../components/mobileview';

function CalendarPage() {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const boxes = [];

  for (let i = 0; i < firstDay; i++) {
    boxes.push(<div key={`blank-${i}`} className="box" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const key = date.toISOString().split('T')[0];
    boxes.push(
      <div key={d} className="box" style={{ border: '1px solid #ccc', padding: '5px' }}>
        <strong>{d}</strong>
        <div>
          {(appointments[key] || []).map((a, i) => (
            <div key={i} style={{ fontSize: '12px' }}>
              {a.time} - {a.patient}
            </div>
          ))}
        </div>
        <button style={{ fontSize: '10px' }} onClick={() => setSelectedDate(date)}>Add</button>
      </div>
    );
  }

  return (
    <div>
      {isMobile ? (
        <MobileView 
          appointments={appointments}
          onAddAppointment={handleAddAppointment}
        />
      ) : (
        <div style={{ padding: '20px' }}>
          <h2>Appointment Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
            {boxes}
          </div>
          {selectedDate && (
            <AppointmentForm
              date={selectedDate}
              onClose={() => setSelectedDate(null)}
              onSave={handleAddAppointment}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
