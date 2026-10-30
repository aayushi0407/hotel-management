import React, { useState } from "react";
import { bookRoom } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { X, CreditCard, Calendar, Users, DollarSign, CheckCircle } from "lucide-react";

const BookingModal = ({ room, onClose, onSuccess }) => {
  const { user } = useAuth();

  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [cardDetails, setCardDetails] = useState({
    cardholdername: user?.name || "",
    cardnumber: "",
    cvvcode: "",
    expmonthyear: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate days & amount
  let totaldays = 0;
  let totalAmount = 0;

  if (fromdate && todate) {
    const start = new Date(fromdate);
    const end = new Date(todate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      totaldays = diffDays;
      totalAmount = diffDays * room.rent;
    }
  }

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromdate || !todate) {
      setError("Please select both check-in and check-out dates.");
      return;
    }
    if (totaldays <= 0) {
      setError("Check-out date must be after check-in date.");
      return;
    }
    if (!cardDetails.cardnumber || !cardDetails.cvvcode || !cardDetails.expmonthyear) {
      setError("Please fill in complete payment card details.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const bookingPayload = {
        roomid: room._id,
        type: room.type,
        userid: user._id,
        username: user.name,
        fromdate,
        todate,
        totalAmount,
        totaldays,
        phone: Number(phone),
        cardDetails,
      };

      const res = await bookRoom(bookingPayload);
      onSuccess(res.booking);
    } catch (err) {
      console.error("Booking error:", err);
      setError(err.response?.data?.message || "Failed to complete booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)",
          }}
        >
          <X size={22} />
        </button>

        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>
          Book {room.type} (Room {room.roomNumber})
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
          Complete the details below to confirm your stay.
        </p>

        {error && (
          <div style={{ background: "#fef2f2", color: "#991b1b", padding: "0.75rem", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Check-in Date</label>
              <input
                type="date"
                className="form-input"
                value={fromdate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setFromdate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Check-out Date</label>
              <input
                type="date"
                className="form-input"
                value={todate}
                min={fromdate || new Date().toISOString().split("T")[0]}
                onChange={(e) => setTodate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Contact Phone</label>
            <input
              type="tel"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Pricing summary */}
          <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border)", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.9rem" }}>
              <span style={{ color: "var(--text-muted)" }}>Rent per night:</span>
              <span style={{ fontWeight: 600 }}>₹{room.rent}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.9rem" }}>
              <span style={{ color: "var(--text-muted)" }}>Total Days:</span>
              <span style={{ fontWeight: 600 }}>{totaldays} day(s)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: "0.5rem", fontSize: "1.1rem", fontWeight: 800 }}>
              <span>Total Amount:</span>
              <span style={{ color: "var(--primary)" }}>₹{totalAmount}</span>
            </div>
          </div>

          {/* Payment Card Details */}
          <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CreditCard size={18} color="var(--primary)" />
            <span>Card Details (Payment Info)</span>
          </h4>

          <div className="form-group">
            <label className="form-label">Cardholder Name</label>
            <input
              type="text"
              name="cardholdername"
              className="form-input"
              placeholder="e.g. Rahul Sharma"
              value={cardDetails.cardholdername}
              onChange={handleCardChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              name="cardnumber"
              className="form-input"
              placeholder="4111 2222 3333 4444"
              value={cardDetails.cardnumber}
              onChange={handleCardChange}
              maxLength="19"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">CVV Code</label>
              <input
                type="password"
                name="cvvcode"
                className="form-input"
                placeholder="123"
                value={cardDetails.cvvcode}
                onChange={handleCardChange}
                maxLength="4"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Exp (MM/YY)</label>
              <input
                type="text"
                name="expmonthyear"
                className="form-input"
                placeholder="12/28"
                value={cardDetails.expmonthyear}
                onChange={handleCardChange}
                maxLength="5"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "0.85rem", marginTop: "1rem" }}
            disabled={loading || totaldays <= 0}
          >
            {loading ? "Processing Reservation..." : `Confirm & Pay ₹${totalAmount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
