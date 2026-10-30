import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";
import About from "./components/common/About";
import UserHome from "./components/user/UserHome";
import BookingHistory from "./components/user/BookingHistory";
import AdminHome from "./components/admin/AdminHome";
import ProtectedRoute from "./components/common/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />

              {/* User Protected Routes */}
              <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <UserHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mybookings"
                element={
                  <ProtectedRoute>
                    <BookingHistory />
                  </ProtectedRoute>
                }
              />

              {/* Admin Protected Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roleRequired="Admin">
                    <AdminHome />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
