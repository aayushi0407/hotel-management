# HotelPro (RoomsForUse) - Full-Stack Hotel Booking & Management System

A production-ready full-stack **MERN** (MongoDB, Express, React, Node.js) application built strictly in accordance with the **HotelPro** architectural blueprint and technical specifications.

---

## 🌟 Key Features

### 👤 Guest / User Features
- **Authentication**: Secure Signup and Login with bcrypt password encryption and JWT sessions.
- **Room Browsing**: Filter available rooms by category (`Delux`, `Non-Delux`, `Suite`, `Ordinary`) and search by amenities.
- **Reservation & Booking**: Real-time date selection (Check-in / Check-out), automatic stay duration and pricing calculation.
- **Secure Payment Simulation**: Guest card details validation and submission.
- **Booking History**: Track all active and historical bookings with booking IDs and total amounts.
- **Cancellation**: Ability to cancel any active booking anytime with instant status updates.

### 🛡️ Admin Features
- **Admin Dashboard**: Tab-based control center:
  - **All Bookings**: Comprehensive card list of every booking across the hotel with `BOOKED` and `CANCELLED` status tags, guest contact info, and admin cancellation powers.
  - **All Rooms**: Full inventory view with room numbers, capacity, daily rates, room types, and room deletion.
  - **Add Room**: Direct interface to publish new hotel rooms with custom photo URLs, pricing, and descriptions.
  - **All Users**: Directory of registered guests and admin staff with user ID, name, email, phone, and role badges.

---

## 📁 Project Structure

```
hotelpro/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB Mongoose connection
│   ├── models/
│   │   ├── userModel.js          # User schema (Name, Email, Password, Phone, UserType)
│   │   ├── roomModel.js          # Room schema (RoomNumber, Count, Rent, Type, Photos, Description, CurrentBooking)
│   │   └── bookingModel.js       # Booking schema (RoomID, UserID, Dates, CardDetails, Status)
│   ├── routes/
│   │   ├── authRoutes.js         # /Signup, /Login, /getallusers
│   │   ├── roomRoutes.js         # /addroom, /getallrooms, /getroombyid, /deleteroom
│   │   └── bookingRoutes.js      # /bookroom, /getbookingsbyuserid, /getallbookings, /cancelbooking
│   ├── middlewares/
│   │   └── authMiddleware.js     # JWT verification middleware
│   ├── .env                      # Environment configuration (Port, MongoDB URI, JWT secret)
│   ├── .env.example              # Sample environment template
│   ├── seed.js                   # Database seeder with sample rooms & accounts
│   ├── server.js                 # Express server entry point
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx    # Responsive navigation (switches for Admin / User / Guest)
│   │   │   │   ├── Footer.jsx    # Footer with quick links
│   │   │   │   ├── Home.jsx      # Landing page with hero carousel & preview
│   │   │   │   ├── Login.jsx     # Split-screen account login
│   │   │   │   ├── SignUp.jsx    # Split-screen account registration
│   │   │   │   ├── About.jsx     # Information page
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── user/
│   │   │   │   ├── UserHome.jsx         # Guest dashboard with room cards & search
│   │   │   │   ├── BookingModal.jsx     # Date picker, price calculator & payment form
│   │   │   │   └── BookingHistory.jsx   # Booking cards with cancellation
│   │   │   └── admin/
│   │   │       ├── AdminHome.jsx        # Tab container matching UI mockups
│   │   │       ├── AllBookingsTab.jsx   # Bookings list
│   │   │       ├── AllRoomsTab.jsx      # Inventory table
│   │   │       ├── AddRoomTab.jsx       # Room publishing form
│   │   │       └── AllUsersTab.jsx      # Users directory table
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global session state & localStorage synchronization
│   │   ├── services/
│   │   │   └── api.js            # Axios client with JWT interceptor
│   │   ├── App.jsx               # Application routes
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18 or higher
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017/hotel`) OR a MongoDB Atlas cloud connection string.

---

### 2. Backend Setup (`server`)

1. Open a terminal and navigate to `server`

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your MongoDB connection in `.env`:

   *(If you are using MongoDB Atlas, replace `MONGO_URI` with your connection string: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/hotel?retryWrites=true&w=majority`)*

4. **Seed Sample Data (Optional but Recommended)**:
   Populate initial test rooms, an admin account, and a sample user:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:8001`.*

---

### 3. Frontend Setup (`client`)

1. Open a second terminal and navigate to `client`:

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

---

## 🔑 Default Test Accounts (After running `npm run seed`)

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@hotelpro.com` | `admin123` |
| **Guest / Ordinary User** | `rahul@gmail.com` | `user123` |

*(You can also click **SignUp** on the website to register a brand new account as either **Ordinary** or **Admin** at any time!)*

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/Signup` | Register a new user (`name, email, password, phone, userType`) |
| `POST` | `/Login` | Authenticate user & return JWT token |
| `GET` | `/getallusers` | Fetch all registered accounts (Admin) |
| `POST` | `/addroom` | Add a new hotel room (Admin) |
| `GET` | `/getallrooms` | Fetch all hotel rooms with photos & details |
| `POST` | `/getroombyid` | Fetch specific room details by `roomid` |
| `DELETE` | `/deleteroom/:id` | Delete a room from inventory |
| `POST` | `/bookroom` | Book a room with dates, guest info & card details |
| `POST` | `/getbookingsbyuserid` | Fetch user-specific bookings |
| `GET` | `/getallbookings` | Fetch all hotel bookings (Admin) |
| `POST` | `/cancelbooking` | Cancel an existing reservation |
