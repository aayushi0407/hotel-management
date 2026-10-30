import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Hotel, Mail, Lock, LogIn, AlertCircle } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await loginUser(formData);

      if (response && response.token) {
        login(response.user, response.token);

        // Redirect based on user role
        const role = response.user.userType?.toLowerCase();
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        setError(response.msg || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login submission error:", err);
      const errMsg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Could not connect to server. Ensure backend is running on port 8001.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Left Side Illustration */}
        <div className="auth-illustration-side">
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "50%", boxShadow: "var(--shadow-md)", marginBottom: "1.5rem" }}>
            <Hotel size={64} color="#2563eb" />
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.5rem" }}>
            Welcome to RoomsForUse
          </h2>
          <p style={{ color: "#475569", fontSize: "0.95rem", maxWidth: "320px" }}>
            Your premier hotel booking and management destination. Manage bookings, browse luxury rooms, and experience seamless hospitality.
          </p>
        </div>

        {/* Right Side Login Form */}
        <div className="auth-form-side">
          <h2 className="auth-title">Login for the Account</h2>
          <p className="auth-subtitle">Enter your credentials to access your account.</p>

          {error && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#991b1b",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.85rem", marginTop: "1rem" }}
              disabled={loading}
            >
              <LogIn size={18} />
              <span>{loading ? "Logging in..." : "LOGIN"}</span>
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "var(--primary)", fontWeight: 700 }}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
