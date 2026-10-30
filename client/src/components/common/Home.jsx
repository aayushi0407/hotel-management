import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllRooms } from "../../services/api";
import { BedDouble, Users, ArrowRight, ShieldCheck, Sparkles, Clock, MapPin } from "lucide-react";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
      } catch (err) {
        console.error("Error fetching rooms for home preview:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <span className="badge badge-info" style={{ marginBottom: "1rem", color: "#0284c7", background: "rgba(255,255,255,0.9)" }}>
            Premium Hospitality Experience
          </span>
          <h1 className="hero-title">Experience Luxury Living & Effortless Stays</h1>
          <p className="hero-subtitle">
            Find the perfect accommodation tailored for your vacations, romantic escapes, and business trips with instant reservation and modern security.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/signup" className="btn btn-primary" style={{ padding: "0.85rem 1.75rem", fontSize: "1rem" }}>
              <span>Book Your Stay Today</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-outline" style={{ padding: "0.85rem 1.75rem", fontSize: "1rem", color: "white", borderColor: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.1)" }}>
              <span>Explore Dashboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights / Features Banner */}
      <section style={{ background: "white", padding: "3rem 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ background: "#eff6ff", padding: "0.75rem", borderRadius: "10px", color: "var(--primary)" }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.25rem" }}>Guaranteed Booking</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>100% verified room availability and instant confirmation with zero hassle.</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ background: "#fef3c7", padding: "0.75rem", borderRadius: "10px", color: "#d97706" }}>
                <Sparkles size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.25rem" }}>Luxury Amenities</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Smart TV, ultra-fast Wi-Fi, air conditioning, and top-tier hospitality service.</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ background: "#f0fdf4", padding: "0.75rem", borderRadius: "10px", color: "#16a34a" }}>
                <Clock size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.25rem" }}>24/7 Front Desk</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Round-the-clock room service and assistance at your fingertips.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="container" style={{ padding: "4rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Featured Accommodations</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
            Select from our hand-crafted suites and rooms designed for comfort and elegance.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
            Loading available rooms...
          </div>
        ) : rooms.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", background: "white", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>No rooms added yet.</p>
            <Link to="/login" className="btn btn-primary">Login to Add Rooms</Link>
          </div>
        ) : (
          <div className="rooms-grid">
            {rooms.slice(0, 3).map((room) => {
              const photoUrl = room.photos && room.photos.length > 0
                ? room.photos[0]
                : "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80";

              return (
                <div key={room._id} className="room-card">
                  <div className="room-image-wrapper">
                    <img src={photoUrl} alt={room.type} className="room-image" />
                    <span className="badge badge-primary room-badge">
                      {room.type}
                    </span>
                  </div>
                  <div className="room-content">
                    <h3 className="room-title">Room {room.roomNumber} - {room.type}</h3>
                    <div className="room-meta">
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Users size={16} /> Capacity: {room.count || 2} Persons
                      </span>
                    </div>
                    <p className="room-desc">{room.description}</p>
                    <div className="room-footer">
                      <div className="room-price">
                        ₹{room.rent} <span>/ night</span>
                      </div>
                      <Link to="/login" className="btn btn-primary" style={{ padding: "0.5rem 1rem" }}>
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link to="/login" className="btn btn-outline" style={{ padding: "0.75rem 2rem", fontWeight: 700 }}>
            <span>Sign in to View All Rooms & Book</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
