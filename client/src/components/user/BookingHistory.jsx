import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBookingsByUserId, cancelBooking } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { CalendarCheck, AlertTriangle, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

const BookingHistory = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchBookings = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const data = await getBookingsByUserId(user._id);
      setBookings(data);
    } catch (err) {
      console.error("Error fetching user bookings:", err);
      setErrorMsg("Failed to load your reservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancel = async (bookingid, roomid) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      setErrorMsg("");
      await cancelBooking(bookingid, roomid);
      setActionMsg("Booking cancelled successfully!");
      fetchBookings();
      setTimeout(() => setActionMsg(""), 3500);
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setErrorMsg("Could not cancel booking. Please try again.");
    }
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <Link to="/user" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--primary)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            <ArrowLeft size={16} />
            <span>Back to Rooms</span>
          </Link>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>My Bookings</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Track and manage your past and active hotel room reservations.
          </p>
        </div>

        <div style={{ background: "white", padding: "0.75rem 1.5rem", borderRadius: "10px", border: "1px solid var(--border)", fontWeight: 700 }}>
          Total Bookings: <span style={{ color: "var(--primary)" }}>{bookings.length}</span>
        </div>
      </div>

      {actionMsg && (
        <div style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", padding: "0.85rem 1.25rem", borderRadius: "8px", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <CheckCircle2 size={18} />
          <span>{actionMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div style={{ background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca", padding: "0.85rem 1.25rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
          Loading your bookings...
        </div>
      ) : bookings.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", background: "white", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <CalendarCheck size={48} color="#94a3b8" style={{ marginBottom: "1rem" }} />
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>No Bookings Found</h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            You haven't reserved any hotel rooms yet. Explore our luxurious collection now!
          </p>
          <Link to="/user" className="btn btn-primary">
            Browse Available Rooms
          </Link>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => {
            const isCancelled = booking.status?.toLowerCase() === "cancelled";

            return (
              <div key={booking._id} className="booking-card">
                <div>
                  <div className="booking-header">
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                        {booking.type} Room
                      </h3>
                    </div>
                    <span className={`badge ${isCancelled ? "badge-danger" : "badge-success"}`}>
                      {booking.status?.toUpperCase() || "BOOKED"}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", wordBreak: "break-all", marginBottom: "1rem" }}>
                    Booking ID: <span style={{ fontWeight: 600, color: "var(--text-main)" }}>{booking._id}</span>
                  </div>

                  <div className="booking-detail-row">
                    <span className="booking-label">From:</span>
                    <span className="booking-val">{booking.fromdate}</span>
                  </div>
                  <div className="booking-detail-row">
                    <span className="booking-label">To:</span>
                    <span className="booking-val">{booking.todate}</span>
                  </div>
                  <div className="booking-detail-row">
                    <span className="booking-label">Total Amount:</span>
                    <span className="booking-val" style={{ color: "var(--primary)" }}>₹{booking.totalAmount}</span>
                  </div>
                  <div className="booking-detail-row">
                    <span className="booking-label">Customer Phone:</span>
                    <span className="booking-val">{booking.phone}</span>
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  {!isCancelled ? (
                    <button
                      onClick={() => handleCancel(booking._id, booking.roomid)}
                      className="btn btn-danger-outline"
                      style={{ width: "100%", padding: "0.6rem" }}
                    >
                      <XCircle size={16} />
                      <span>CANCEL BOOKING</span>
                    </button>
                  ) : (
                    <div style={{ textAlign: "center", fontSize: "0.85rem", color: "#dc2626", fontWeight: 600, padding: "0.5rem", background: "#fee2e2", borderRadius: "6px" }}>
                      Reservation Cancelled
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
