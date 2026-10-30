import React, { useState, useEffect } from "react";
import { getAllBookings, cancelBooking } from "../../services/api";
import { XCircle, CheckCircle2 } from "lucide-react";

const AllBookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getAllBookings();
      setBookings(data);
    } catch (err) {
      console.error("Error fetching all bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingid, roomid) => {
    if (!window.confirm("Are you sure you want to cancel this user booking?")) return;
    try {
      await cancelBooking(bookingid, roomid);
      setMsg("Booking has been marked as cancelled.");
      fetchBookings();
      setTimeout(() => setMsg(""), 3500);
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel booking.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>All Customer Bookings</h2>
        <div style={{ background: "white", padding: "0.5rem 1.25rem", borderRadius: "8px", border: "1px solid var(--border)", fontWeight: 700 }}>
          Total Bookings: <span style={{ color: "var(--primary)" }}>{bookings.length}</span>
        </div>
      </div>

      {msg && (
        <div style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", padding: "0.85rem", borderRadius: "8px", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <CheckCircle2 size={18} />
          <span>{msg}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          Loading bookings data...
        </div>
      ) : bookings.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", background: "white", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <p style={{ color: "var(--text-muted)" }}>No customer bookings recorded yet.</p>
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
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        Guest: <span style={{ fontWeight: 600, color: "var(--text-main)" }}>{booking.username}</span>
                      </div>
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
                      onClick={() => handleCancelBooking(booking._id, booking.roomid)}
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

export default AllBookingsTab;
