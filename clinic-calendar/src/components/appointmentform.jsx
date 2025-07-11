import React, { useState } from 'react';
import { patients, doctors } from '../data/lists';

function appointmentform({ date, onClose, onSave }) {
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [time, setTime] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!patient || !doctor || !time) return alert('Please fill all fields');
    onSave(date, { patient, doctor, time });
    onClose();
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%',
      height: '100%', backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
        <h3>Add Appointment</h3>

        <select value={patient} onChange={e => setPatient(e.target.value)} required>
          <option value="">Select Patient</option>
          {patients.map(p => <option key={p}>{p}</option>)}
        </select>

        <br /><br />

        <select value={doctor} onChange={e => setDoctor(e.target.value)} required>
          <option value="">Select Doctor</option>
          {doctors.map(d => <option key={d}>{d}</option>)}
        </select>

        <br /><br />

        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Save</button>
        <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
      </form>
    </div>
  );
}

export default appointmentform;
