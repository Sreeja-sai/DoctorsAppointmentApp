import React, { useState, useEffect } from 'react';
import { FaSearch, FaHeart } from 'react-icons/fa';
import { Link, useNavigate} from 'react-router-dom';

import './index.css';




const categories = [
  { name: "Dental", icon: "🦷" },
  { name: "Heart", icon: "❤️" },
  { name: "Eye", icon: "👁️" },
  { name: "Brain", icon: "🧠" },
  { name: "Ear", icon: "👂" },
  { name: "Lungs", icon: "🫁" },
  { name: "Bones", icon: "🦴" },
  { name: "Kidney", icon: "🩺" },
  { name: "Skin", icon: "🧴" },
  { name: "Psychiatry", icon: "🧘" },
  { name: "Pediatrics", icon: "👶" },
  { name: "Orthopedics", icon: "🦿" },
  { name: "Gastroenterology", icon: "🍽️" },
  { name: "Gynecology", icon: "👩‍⚕️" },
  { name: "Neurology", icon: "💡" },
  { name: "Oncology", icon: "🎗️" },
  { name: "General", icon: "👨‍⚕️" },
  { name: "ENT", icon: "👃" },
  { name: "Physiotherapy", icon: "🏃‍♂️" },
  { name: "Dermatology", icon: "🌞" }
];

const doctors = [
  {
    id: 1,
    name: "Dr. Arjun Mehta",
    specialization: "Cardiologist",
    imageUrl: "https://suplinen.com/wp-content/uploads/2024/05/What-do-doctors-wear.jpg",
    status: "Available Today",
    category: "Heart",
    rating: 4.2
  },
  {
    id: 2,
    name: "Dr. Pooja Iyer",
    specialization: "Dentist",
    imageUrl: "https://c8.alamy.com/comp/AXR8F2/female-doctor-or-nurse-standing-wearing-white-lab-coat-and-stethoscope-AXR8F2.jpg",
    status: "On Leave",
    category: "Dental",
    rating: 4.2
  },
  {
    id: 3,
    name: "Dr. Rakul Nair",
    specialization: "Neurologist",
    imageUrl: "https://png.pngtree.com/png-clipart/20250213/original/pngtree-a-doctor-white-coat-with-stethoscope-around-her-neck-png-image_19259770.png",
    status: "Fully Booked",
    category: "Brain",
    rating: 4.5
  },
  {
    id: 4,
    name: "Dr. Meghana Kapoor",
    specialization: "ENT Specialist",
    imageUrl: "https://i.pinimg.com/736x/57/1b/0a/571b0a93ecd6dd2800f4970db5e8f7c6.jpg",
    status: "Available Tomorrow",
    category: "Ear",
    rating: 3.8
  },
  {
    id: 5,
    name: "Dr. Sreeja Prasad",
    specialization: "Cardiologist",
    imageUrl: "https://www.shutterstock.com/image-photo/portrait-asian-female-doctor-wearing-600nw-2502070973.jpg",
    status: "On Leave",
    category: "Heart",
    rating: 3.6
  },
  {
    id: 6,
    name: "Dr. Neha Sharma",
    specialization: "Pediatrician",
    imageUrl: "https://www.shutterstock.com/image-photo/happy-female-doctor-stethoscope-on-600nw-2527451925.jpg",
    status: "Available Today",
    category: "Pediatrics",
    rating: 4.0
  },
  {
    id: 7,
    name: "Dr. Vani Sinha",
    specialization: "Psychiatrist",
    imageUrl: "https://cdn.create.vista.com/api/media/small/76570869/stock-photo-confident-female-doctor-posing-in-her-office",
    status: "Fully Booked",
    category: "Psychiatry",
    rating: 3.2
  },
  {
    id: 8,
    name: "Dr. Anu Rao",
    specialization: "Endocrinologist",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcQnQYrO0T6jzEbPkVb3JyfsEH3o1xtj-kNa7qpSpW89D8jKhjKs9Vvy1amaWGJZsHZ6A&usqp=CAU",
    status: "Available Today",
    category: "General",
    rating: 3.6
  },
  {
    id: 9,
    name: "Dr. Karan Malhotra",
    specialization: "Pulmonologist",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRigHiqN2bZVEQ3Y8RvlRI-4K53WJrti6T2lTtXqg6FSOfbir-fsQSkE6YjDLKFqFWgeDw&usqp=CAU",
    status: "Fully Booked",
    category: "Lungs",
    rating: 3.0
  },
  {
    id: 10,
    name: "Dr. Sunil Desai",
    specialization: "Neurologist",
    imageUrl: "https://thumbs.dreamstime.com/b/indian-doctor-stethoscope-around-neck-his-office-170292594.jpg",
    status: "Available Today",
    category: "Brain",
    rating: 4.8
  },
  {
    id: 11,
    name: "Dr. Rohini Gupta",
    specialization: "Nephrologist",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/007/219/736/large_2x/portrait-of-a-young-attractive-doctor-in-white-coat-with-stethoscope-posing-in-the-hospital-photo.jpg",
    status: "Available Tomorrow",
    category: "Kidney",
    rating: 3.2
  },
  {
    id: 12,
    name: "Dr. Shreya Bansal",
    specialization: "Ophthalmologist",
    imageUrl: "https://images.pexels.com/photos/32254665/pexels-photo-32254665.jpeg?cs=srgb&dl=pexels-konrads-photo-32254665.jpg&fm=jpg",
    status: "Available Today",
    category: "Eye",
    rating: 3.5
  }
];

const LandingPage = ({ userData }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [searchText, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [appointments, setAppointments] = useState([]);
  const [bookedDoctorIds, setBookedDoctorIds] = useState([]);

  const navigate = useNavigate();
  // Load appointments from localStorage
  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
  }, []);

  // Update booked doctor IDs
  useEffect(() => {
    const bookedIds = appointments.map(appt => appt.doctorId);
    setBookedDoctorIds(bookedIds);
  }, [appointments]);

  // Filter doctors
  useEffect(() => {
    let filtered = [...doctors];

    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(search) ||
        doc.specialization.toLowerCase().includes(search)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    setFilteredDoctors(filtered);
  }, [searchText, selectedCategory]);

// const bookAppointment = (doctor) => {
//   const date = new Date().toISOString().split('T')[0];
//   const time = '10:00 AM';

//   const newAppointment = {
//     doctorId: doctor.id,
//     doctorName: doctor.name,
//     specialization: doctor.specialization,
//     date,
//     time,
//     location: "NirogGyan Clinic"
//   };

//   const updatedAppointments = [...appointments, newAppointment];
//   setAppointments(updatedAppointments);
//   localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

//   // Navigate to doctor profile after booking
//   navigate(`/doctor/${doctor.id}`);
// };

const handleDelete = (doctorId) => {
  const updatedAppointments = appointments.filter(
    (appt) => appt.doctorId !== doctorId
  );
  setAppointments(updatedAppointments);
  localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
};



  return (
    <div className="doctor-home">
      {showProfile ? (
        <div className="profile-section">
          <button onClick={() => setShowProfile(false)} className="close-profile-btn">Close</button>
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="profile-img-large" />
          <h2 className="profile-name">{userData?.name || 'Sai Sreeja'}</h2>
          <p className="profile-email">{userData?.email || 'sai.sreeja@example.com'}</p>
          <p className="profile-role">Role: Patient</p>

          <h2 style={{ marginTop: '30px' }}>🧾 My Booked Appointments</h2>
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <ul className="appointment-list">
              {appointments.map((appt, index) => (
                <li key={index} className="appointment-card">
                  <p><strong>Doctor:</strong> {appt.doctorName}</p>
                  <p><strong>Specialization:</strong> {appt.specialization}</p>
                  <p><strong>Date:</strong> {appt.date}</p>
                  <p><strong>Time:</strong> {appt.time}</p>
                  {appt.location && <p><strong>Location:</strong> {appt.location}</p>}
                            <button
            className="delete-btn"
            onClick={() => handleDelete(appt.doctorId)}
          >
            Delete
          </button>

                </li>
                
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          <div className="header">
            {/* <button  className="profile-btn">My Profile</button> */}
            <div className="header-top">
              <img onClick={() => setShowProfile(true)} src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" className="profile-img" />
              <span className='medication-type'>NirogGyan Medication</span>
              <span className="notification-icon">🔔</span>
            </div>
            <div className="header-text">
              <p>Hi, Programmer</p>
              <h1>Your Health is Our First Priority</h1>
            </div>
            <div className="cta-hero">
              <h1 className="cta-title">Find The Best Doctors Near You</h1>
              <p className="cta-subtitle">Search by specialization or name and book appointments with ease.</p>
            </div>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or specialization..."
              />
            </div>
          </div>

          <div className="categories">
            <h2>Categories</h2>
            <div className="category-list">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`category-card ${selectedCategory === category.name ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="recommended">
            <h2>Recommended Doctors</h2>
            <div className="doctor-list">
              {filteredDoctors.map((doc, idx) => (
                <Link to={`/doctor/${doc.id}`} className="doctor-link" key={idx}>
  <div className="doctor-card" onClick={(e) => {
    // Prevent card click if user is clicking the book button
    if (e.target.classList.contains('book-btn')) e.preventDefault();
  }}>
    <img src={doc.imageUrl} alt={doc.name} />
    <h3>{doc.name}</h3>
    <p className="specialization">{doc.specialization}</p>
    <p className={`availability ${doc.status.replace(/\s/g, '-').toLowerCase()}`}>
      {doc.status}
    </p>

    {bookedDoctorIds.includes(doc.id) && (
      <p className="booked-label">✅ Booked</p>
    )}

    {/* Book Button */}
    {!["On Leave", "Fully Booked"].includes(doc.status) && !bookedDoctorIds.includes(doc.id) && (
      <button
  className="book-btn"
  onClick={(e) => {
    e.preventDefault();
    navigate(`/doctor/${doc.id}`, { state: { doctor: doc } }); // only navigate
  }}
>
  Book Appointment
</button>

    )}

    {/* If already booked or unavailable */}
    {bookedDoctorIds.includes(doc.id) && (
      <button className="book-btn booked" disabled>
        Already Booked
      </button>
    )}
    {["On Leave", "Fully Booked"].includes(doc.status) && !bookedDoctorIds.includes(doc.id) && (
      <button className="book-btn unavailable" disabled>
        {doc.status}
      </button>
    )}

    <div className="rate-container">
      <p className="rating">⭐ {doc.rating}</p>
      <FaHeart className="heart-icon" />
    </div>
  </div>
</Link>

              ))}
              {filteredDoctors.length === 0 && (
                <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No doctors found</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
