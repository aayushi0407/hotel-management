import React, { useState } from "react";
import { addRoom } from "../../services/api";
import { PlusCircle, CheckCircle2, AlertCircle } from "lucide-react";

const AddRoomTab = ({ onRoomAdded }) => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    count: "",
    rent: "",
    type: "Delux",
    image1: "",
    image2: "",
    image3: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.roomNumber || !formData.count || !formData.rent || !formData.description) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const photos = [formData.image1, formData.image2, formData.image3].filter(
        (url) => url && url.trim().length > 0
      );

      // Default fallback luxury image if none provided
      if (photos.length === 0) {
        photos.push("https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80");
      }

      const payload = {
        roomNumber: Number(formData.roomNumber),
        count: Number(formData.count),
        rent: Number(formData.rent),
        type: formData.type,
        photos: photos,
        description: formData.description,
      };

      await addRoom(payload);
      setSuccess("New Room Added Successfully!");

      setFormData({
        roomNumber: "",
        count: "",
        rent: "",
        type: "Delux",
        image1: "",
        image2: "",
        image3: "",
        description: "",
      });

      if (onRoomAdded) {
        setTimeout(() => {
          onRoomAdded();
        }, 1200);
      }
    } catch (err) {
      console.error("Error adding room:", err);
      setError(err.response?.data?.message || "Failed to create new room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ background: "white", padding: "2.5rem", borderRadius: "16px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, textAlign: "center", marginBottom: "0.25rem" }}>
          Add a New Room
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center", marginBottom: "2rem" }}>
          Create and publish a new room to the booking platform.
        </p>

        {success && (
          <div style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", padding: "0.85rem", borderRadius: "8px", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CheckCircle2 size={18} />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div style={{ background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca", padding: "0.85rem", borderRadius: "8px", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Room Number</label>
              <input
                type="number"
                name="roomNumber"
                className="form-input"
                placeholder="e.g. 101"
                value={formData.roomNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Max. Capacity</label>
              <input
                type="number"
                name="count"
                className="form-input"
                placeholder="No. of people"
                value={formData.count}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Room Rent</label>
              <input
                type="number"
                name="rent"
                className="form-input"
                placeholder="Rent per day (₹)"
                value={formData.rent}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ margin: "1rem 0" }}>
            <label className="form-label">Room Photos (URLs)</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input
                type="url"
                name="image1"
                className="form-input"
                placeholder="Image 1 URL"
                value={formData.image1}
                onChange={handleChange}
              />
              <input
                type="url"
                name="image2"
                className="form-input"
                placeholder="Image 2 URL"
                value={formData.image2}
                onChange={handleChange}
              />
              <input
                type="url"
                name="image3"
                className="form-input"
                placeholder="Image 3 URL"
                value={formData.image3}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Room Type</label>
            <div style={{ display: "flex", gap: "2rem", marginTop: "0.5rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.95rem" }}>
                <input
                  type="radio"
                  name="type"
                  value="Delux"
                  checked={formData.type === "Delux"}
                  onChange={handleChange}
                />
                <span>Delux</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.95rem" }}>
                <input
                  type="radio"
                  name="type"
                  value="Non-Delux"
                  checked={formData.type === "Non-Delux"}
                  onChange={handleChange}
                />
                <span>Non-Delux</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.95rem" }}>
                <input
                  type="radio"
                  name="type"
                  value="Suite"
                  checked={formData.type === "Suite"}
                  onChange={handleChange}
                />
                <span>Suite</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.95rem" }}>
                <input
                  type="radio"
                  name="type"
                  value="ordinary"
                  checked={formData.type === "ordinary"}
                  onChange={handleChange}
                />
                <span>Ordinary</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Room Description</label>
            <textarea
              name="description"
              rows="4"
              className="form-textarea"
              placeholder="Describe room amenities, view, bed type, etc."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "0.85rem", marginTop: "1rem" }}
            disabled={loading}
          >
            <PlusCircle size={18} />
            <span>{loading ? "Adding Room..." : "ADD ROOM"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoomTab;
