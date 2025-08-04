import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';
import doctors from '../../data/doctors';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctors.find(doc => doc.id === parseInt(id));

  if (!doctor) return <p className="not-found">Doctor not found</p>;

  return (
    <div className="doctor-profile-container">
      <div className="doctor-card">
        <img src={doctor.imageUrl} alt={doctor.name} className="doctor-img" />
        <div className="doctor-info">
          <h2 className="doctor-name">{doctor.name}</h2>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Status:</strong> {doctor.status}</p>
          <p><strong>Rating:</strong> ⭐ {doctor.rating}</p>

          <div className="availability">
            <h3>Availability Schedule</h3>
            <ul>
              <li>Monday - Friday: 10AM - 4PM</li>
              <li>Saturday: 10AM - 1PM</li>
            </ul>
          </div>
          <button
  className="book-btn"
  onClick={() => {
    if (doctor.status === "Available Today" || doctor.status==="Available Tomorrow") {
      navigate(`/book/${id}`);
    } else {
      alert("Doctor is not available for booking today.");
    }
  }}
  disabled={doctor.status !== "Available Today" && doctor.status!=="Available Tomorrow"}
  style={{
    opacity: (doctor.status !== "Available Today" && doctor.status!=="Available Tomorrow") ? 0.6 : 1,
    cursor: (doctor.status !== "Available Today" && doctor.status!=="Available Tomorrow") ? "not-allowed" : "pointer"
  }}
>
  {(doctor.status === "Available Today" || doctor.status==="Available Tomorrow") ? "Book Appointment" : "Not Available Today"}
</button>



        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
