import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import doctors from '../../data/doctors';

const BookAppointment = () => {
  const { id } = useParams();
  const doctor = doctors.find(doc => doc.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!doctor) return <p>Doctor not found</p>;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = e => {
  e.preventDefault();

  const newBooking = {
    doctorId: doctor.id,
    doctorName: doctor.name,
    specialization: doctor.specialization,
    location: doctor.location,
    userName: formData.name,
    userEmail: formData.email,
    date: formData.date,
    time: formData.time,
  };

  const existing = JSON.parse(localStorage.getItem("appointments")) || [];
  const updatedAppointments = [...existing, newBooking];

  localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  setSubmitted(true);
};


  return (
    <div className="book-appointment-container">
      <h2>Book Appointment with Dr. {doctor.name}</h2>
      {submitted ? (
        <div className="confirmation">
          <h3>Appointment Confirmed ✅</h3>
          <p>Thank you, <strong>{formData.name}</strong>!</p>
          <p>Your appointment with <strong>Dr. {doctor.name}</strong> is booked on <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.</p>
          <p>A confirmation email will be sent to <strong>{formData.email}</strong>.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="appointment-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="submit-btn">Confirm Appointment</button>
        </form>
      )}
    </div>
  );
};

export default BookAppointment;
