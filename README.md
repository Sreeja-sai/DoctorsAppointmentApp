---

## ✨ Features

### 🏠 Landing Page

- Displays a list of doctors with:
  - ✅ Name
  - ✅ Specialization
  - ✅ Profile Image
  - ✅ Availability Status:
    - `Available Today` (✅ Can be booked)
    - `Fully Booked` (🚫 Booking disabled)
    - `On Leave` (🚫 Booking disabled)
- Includes a **search bar** to filter doctors by name or specialization

### 👨‍⚕️ Doctor Profile Page

- Displays detailed information about the doctor
- Shows real-time availability status
- **Book Appointment** button appears only if the doctor is `Available Today`
- Navigates to appointment form when applicable

### 📅 Book Appointment Flow

- Simple and user-friendly form
- Collects:
  - Patient Name
  - Email Address
  - Desired Date & Time
- Displays a **success confirmation message** upon submission
- Booking restricted for:
  - Doctors marked as **Fully Booked**
  - Doctors marked as **On Leave**

### 🔐 Authentication (UI Only)

- Login and Signup pages with:
  - Password visibility toggle
  - Basic input validations
  - Toggle between login and signup views
- Uses `fetch()` for form submission
- Token handling logic prepared via `localStorage.setItem('token')`
- **Backend validation still pending**

---

## ⏳ Backend Integration (To Be Done)

- API connections for:
  - Login
  - Signup
  - Fetching doctor data dynamically
  - Submitting appointments to backend DB
- Currently using placeholder logic and mock responses
- Once backend is ready, `fetch()` logic in forms and doctor data fetching can be enabled

---

## ❗ Additional Business Logic

- ❌ Users **cannot book appointments** for:
  - Doctors marked as **Fully Booked**
  - Doctors who are **On Leave**
- ✅ Appointment form and button is only available when doctor is **Available Today**
- ✅ These rules are enforced in the UI logic and can be further enhanced after backend integration

---

## 📦 Getting Started (Run Locally)

```bash
# Clone the repository
git clone https://github.com/yourusername/nirog-gyan-frontend.git

# Navigate into the project folder
cd nirog-gyan-frontend

# Install dependencies
npm install

# Start development server
npm start
```
