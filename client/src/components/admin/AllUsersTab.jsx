import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../services/api";
import { Users, Shield, User } from "lucide-react";

const AllUsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching all users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>All Registered Users</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Registered guests and administrative staff accounts.</p>
        </div>

        <div style={{ background: "white", padding: "0.5rem 1.25rem", borderRadius: "8px", border: "1px solid var(--border)", fontWeight: 700 }}>
          Total Users: <span style={{ color: "var(--primary)" }}>{users.length}</span>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          Loading user records...
        </div>
      ) : users.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", background: "white", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <p style={{ color: "var(--text-muted)" }}>No registered users found.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isAdminRole = u.userType?.toLowerCase() === "admin";

                return (
                  <tr key={u._id}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {u._id}
                    </td>
                    <td style={{ fontWeight: 700 }}>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>
                      <span className={`badge ${isAdminRole ? "badge-danger" : "badge-info"}`}>
                        {u.userType || "Ordinary"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsersTab;
