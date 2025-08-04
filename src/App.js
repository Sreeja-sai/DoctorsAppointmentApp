// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Login from './components/Login';
// import Signup from './components/Signup';
import Landing from './components/Landing';
import DoctorProfile from './components/DoctorProfile';
import BookAppointment from './components/BookAppointment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route path="/" element={<Landing />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/book/:id" element={<BookAppointment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
