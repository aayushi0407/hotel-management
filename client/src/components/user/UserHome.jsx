import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRooms } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import BookingModal from "./BookingModal";
import { Users, BedDouble, CalendarCheck, Search, Filter, Sparkles, CheckCircle } from "lucide-react";

const UserHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await getAllRooms();
      setRooms(data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleBookingCompleted = (booking) => {
    setSelectedRoom(null);
    setBookingSuccess(true);
    setTimeout(() => {
      navigate("/mybookings");
    }, 1800);
  };

  // Filter logic
  const filteredRooms = rooms.filter((r) => {
    const matchesSearch =
      r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(r.roomNumber).includes(searchTerm);

    const matchesType =
      filterType === "all" || r.type.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesType;
  });

  return (
    <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          color: "white",
          borderRadius: "16px",
          padding: "2.5rem 2rem",
          marginBottom: "2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div>
          <span className="badge badge-info" style={{ color: "#0369a1", background: "white", marginBottom: "0.5rem" }}>
            Guest Portal
          </span>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Welcome back, {user?.name}!
          </h1>
          <p style={{ color: "#dbeafe", fontSize: "1rem" }}>
            Explore available rooms, check real-time rates, and book your next luxury stay.
          </p>
        </div>

        <Link
          to="/mybookings"
          className="btn btn-outline"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            color: "white",
            borderColor: "rgba(255, 255, 255, 0.4)",
            padding: "0.75rem 1.5rem",
            fontSize: "0.95rem",
          }}
        >
          <CalendarCheck size={18} />
          <span>View My Bookings</span>
        </Link>
      </div>

      {bookingSuccess && (
        <div
          style={{
            background: "#f0fdf4",
            border: "1.5px solid #86efac",
            color: "#166534",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontWeight: 600,
          }}
        >
          <CheckCircle size={22} color="#16a34a" />
          <span>Room Booked Successfully! Redirecting to your bookings history...</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div
        style={{
          background: "white",
          padding: "1.25rem",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: "260px" }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search rooms by number, type, or amenities..."
            className="form-input"
            style={{ border: "none", padding: "0.5rem 0", background: "transparent" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Filter size={18} color="var(--text-muted)" />
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-muted)" }}>Type:</span>
          <select
            className="form-select"
            style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.875rem" }}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="ordinary">Ordinary</option>
            <option value="delux">Delux</option>
            <option value="suite">Suite</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>

      {/* Rooms List / Grid matching Screenshot 11 */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
          Loading available accommodations...
        </div>
      ) : filteredRooms.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", background: "white", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>No rooms match your search criteria.</p>
        </div>
      ) : (
        <div className="rooms-grid">
          {filteredRooms.map((room) => {
            const photoUrl =
              room.photos && room.photos.length > 0
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
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Users size={16} /> Room Capacity: {room.count || 2} people
                    </span>
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                    Type: <span style={{ color: "var(--primary)" }}>{room.type}</span>
                  </div>
                  <p className="room-desc">{room.description}</p>

                  <div className="room-footer">
                    <div className="room-price">
                      Rent: ₹{room.rent} <span>per day</span>
                    </div>
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="btn btn-primary"
                      style={{ padding: "0.55rem 1.25rem" }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onSuccess={handleBookingCompleted}
        />
      )}
    </div>
  );
};

export default UserHome;
