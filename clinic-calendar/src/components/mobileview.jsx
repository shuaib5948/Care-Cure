import React, { useState } from 'react';
import AppointmentForm from './appointmentform';

function MobileView({ appointments, onAddAppointment }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const formatDate = (date) => {
    return date.toDateString();
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

  return (
    <div style={{ padding: '10px' }}>
      {/* Simple Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => navigateDate(-1)} style={{ padding: '10px' }}>
            ← Prev
          </button>
          <h3 style={{ margin: '0' }}>{formatDate(currentDate)}</h3>
          <button onClick={() => navigateDate(1)} style={{ padding: '10px' }}>
            Next →
          </button>
        </div>
        <button onClick={goToToday} style={{ marginTop: '10px', padding: '5px 15px' }}>
          Today
        </button>
      </div>

      {/* Add Appointment Button */}
      <button
        onClick={() => setSelectedDate(currentDate)}
        style={{
          width: '100%',
          padding: '15px',
          background: 'green',
          color: 'white',
          border: 'none',
          marginBottom: '20px',
          fontSize: '16px'
        }}
      >
        + Add Appointment
      </button>

      {/* Appointments List */}
      <div>
        <h4>Appointments for {formatDate(currentDate)}:</h4>
        {dayAppointments.length === 0 ? (
          <p>No appointments scheduled</p>
        ) : (
          dayAppointments.map((appointment, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <div><strong>Time:</strong> {appointment.time}</div>
              <div><strong>Patient:</strong> {appointment.patient}</div>
              <div><strong>Doctor:</strong> {appointment.doctor}</div>
            </div>
          ))
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
    </div>
  );
}

export default MobileView;
