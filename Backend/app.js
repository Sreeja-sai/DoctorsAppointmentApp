const express=require('express');
const path=require('path');

const {open}=require('sqlite');
const sqlite3 =require('sqlite3');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const cors = require("cors");


const dbpath=path.join(__dirname,'medications.db');
const app=express();
app.use(express.json());
let db;
app.use(cors({ origin: 'http://localhost:3000' })); // frontend running on port 3000

const dbConnection=async ()=>{
  try{
    db= await open({
      filename:dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000,()=>{
      console.log("Server Started at localhost: 3000");
    })
  }catch(err){
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
}

dbConnection();


app.post('/signup/', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields are required' });
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const existQuery=`SELECT * FROM users WHERE email=?;`;
  const dbResponse=await db.get(existQuery,[email]);
  if(dbResponse===undefined){
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(query,[name,email,hashedPassword]);
    return res.status(200).send("User Registerd Successfully");
  }else{
    return res.status(409).json({ error: 'Email already exists' });
  }
});

app.post('/login/',async(request,response)=>{
  const {email,password}=request.body;
  try{
    const getEmailQuery=`SELECT * FROM users WHERE email = ?`;
    const user=await db.get(getEmailQuery,[email]);
    if(!user){
      return response.status(401).send("Email Id doesnot exists");
    }
    const isValidPassword=await bcrypt.compare(password,user.password);
    // console.log(user.password);
    
    if(isValidPassword){
      const payload={
        id:user.id,
        email:user.email
      };
      const jwt_token=jwt.sign(payload,"MY_SECRET_TOKEN");
      response.send({jwt_token})
    }else{
      response.status(401).send("Invalid email or password");
    }
  }catch(err){
    response.status(500).send(`Login Failed:${err.message}`);
  }
});


// Get all doctors
app.get('/doctors', async (req, res) => {
  try {
    const query = `SELECT * FROM doctors;`;
    const doctors = await db.all(query); // db.all() returns all rows

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/bookings', async (req, res) => {
  const { name, email, doctor_id, date, time } = req.body;

  // Validate input
  if (!name || !email || !doctor_id || !date || !time) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    // Get user_id from users table
    const getUserQuery = `SELECT id FROM users WHERE name = ? AND email = ?`;
    const user = await db.get(getUserQuery, [name, email]);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if doctor exists
    const doctor = await db.get(`SELECT * FROM doctors WHERE id = ?`, [doctor_id]);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Optional: Check overlapping appointments for same doctor, date, time
    const checkQuery = `
      SELECT * FROM bookings
      WHERE doctor_id = ? AND booking_date = ? AND time = ?
    `;
    const existing = await db.get(checkQuery, [doctor_id, date, time]);
    if (existing) {
      return res.status(409).json({ error: 'Doctor already has an appointment at this time' });
    }

    // Insert booking
    const insertQuery = `
      INSERT INTO bookings (user_id, doctor_id, booking_date, time)
      VALUES (?, ?, ?, ?)
    `;
    await db.run(insertQuery, [user.id, doctor_id, date, time]);

    return res.status(200).json({ message: 'Appointment booked successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});



//Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Token missing. Unauthorized access.' });
  }

  jwt.verify(token, "MY_SECRET_TOKEN", (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }

    req.user = user; // decoded { id, email, ... }
    next();
  });
};


app.get("/my-bookings/:id", authenticateToken, async (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  try {
    const bookings = await db.all(`
      SELECT 
        bookings.id AS booking_id,
        doctors.name AS doctor_name,
        doctors.specialization,
        doctors.image_url,
        bookings.booking_date,
        bookings.time AS booking_time
      FROM bookings
      JOIN doctors ON bookings.doctor_id = doctors.id
      WHERE bookings.user_id = ?
      ORDER BY bookings.booking_date DESC
    `, [userId]);

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});


app.delete("/bookings/:id", authenticateToken, async (req, res) => {
  const bookingId = req.params.id;

  try {
    const existingBooking = await db.get(`SELECT * FROM bookings WHERE id = ?`, [bookingId]);

    if (!existingBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await db.run(`DELETE FROM bookings WHERE id = ?`, [bookingId]);

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
});
