import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Hotel, User, LogOut, CalendarCheck, Home as HomeIcon } from "lucide-react";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isUserAdmin = isAdmin();

  return (
    <nav className={`main-navbar ${isUserAdmin ? "admin-navbar" : ""}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <Hotel size={26} color={isUserAdmin ? "#ffffff" : "#2563eb"} />
          <span>RoomsForUse</span>
        </Link>

        <ul className="nav-links">
          {user ? (
            <>
              {isUserAdmin ? (
                <>
                  <li className="nav-link" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <User size={18} />
                    <span>Hi, {user.name}</span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline"
                      style={{
                        borderColor: "rgba(255,255,255,0.4)",
                        color: "white",
                        padding: "0.4rem 0.9rem",
                      }}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/user" className="nav-link">
                      Rooms
                    </Link>
                  </li>
                  <li>
                    <Link to="/mybookings" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <CalendarCheck size={16} />
                      <span>My Bookings</span>
                    </Link>
                  </li>
                  <li className="nav-link" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <User size={18} color="#2563eb" />
                    <span>Hi, {user.name}</span>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="btn btn-outline" style={{ padding: "0.4rem 0.9rem" }}>
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              )}
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn btn-primary" style={{ padding: "0.5rem 1.1rem" }}>
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
