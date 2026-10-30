import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";
import { Hotel, UserPlus, AlertCircle, CheckCircle } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    userType: "Ordinary",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: Number(formData.phone),
        userType: formData.userType,
      };

      const response = await registerUser(payload);

      if (response && (response.status === "true" || response.msg === "User registered successfully")) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(response.msg || "Failed to create account.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const errMsg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Could not connect to server. Ensure backend is running.";
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
            Join RoomsForUse
          </h2>
          <p style={{ color: "#475569", fontSize: "0.95rem", maxWidth: "320px" }}>
            Create your account today to book top-tier hotel rooms or manage your property with our comprehensive admin tools.
          </p>
        </div>

        {/* Right Side Register Form */}
        <div className="auth-form-side">
          <h2 className="auth-title">Register for the Account</h2>
          <p className="auth-subtitle">Please enter your personal details below.</p>

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

          {success && (
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#166534",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <CheckCircle size={18} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Enter Mobile no.</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="Enter Mobile no."
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">SELECT USER</label>
              <select
                name="userType"
                className="form-select"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="Ordinary">Ordinary / Customer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.85rem", marginTop: "1rem" }}
              disabled={loading}
            >
              <UserPlus size={18} />
              <span>{loading ? "Registering..." : "REGISTER"}</span>
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Had an account?{" "}
            <Link to="/login" style={{ color: "var(--primary)", fontWeight: 700 }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
