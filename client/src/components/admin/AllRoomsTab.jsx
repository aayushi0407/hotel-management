import React, { useState, useEffect } from "react";
import { getAllRooms, deleteRoom } from "../../services/api";
import { Trash2, Plus, BedDouble } from "lucide-react";

const AllRoomsTab = ({ onNavigateToAddRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

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

  const handleDelete = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await deleteRoom(roomId);
      setMsg("Room deleted successfully.");
      fetchRooms();
      setTimeout(() => setMsg(""), 3500);
    } catch (err) {
      console.error("Delete room error:", err);
      alert("Failed to delete room.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Hotel Room Inventory</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Manage all active rooms and accommodation categories.</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ background: "white", padding: "0.5rem 1.25rem", borderRadius: "8px", border: "1px solid var(--border)", fontWeight: 700 }}>
            Total Rooms: <span style={{ color: "var(--primary)" }}>{rooms.length}</span>
          </div>
          <button onClick={onNavigateToAddRoom} className="btn btn-primary" style={{ padding: "0.5rem 1.25rem" }}>
            <Plus size={16} />
            <span>Add New Room</span>
          </button>
        </div>
      </div>

      {msg && (
        <div style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", padding: "0.85rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
          {msg}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          Loading rooms catalog...
        </div>
      ) : rooms.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", background: "white", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>No rooms available.</p>
          <button onClick={onNavigateToAddRoom} className="btn btn-primary">Add Room Now</button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Room Number</th>
                <th>Capacity</th>
                <th>Rent / Day</th>
                <th>Type</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {room._id}
                  </td>
                  <td style={{ fontWeight: 700 }}>Room {room.roomNumber}</td>
                  <td>{room.count || 2} persons</td>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>₹{room.rent}</td>
                  <td>
                    <span className="badge badge-primary">{room.type}</span>
                  </td>
                  <td style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {room.description}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="btn btn-outline"
                      title="Delete Room"
                      style={{ padding: "0.4rem 0.6rem", color: "#dc2626", borderColor: "#fecaca" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllRoomsTab;
