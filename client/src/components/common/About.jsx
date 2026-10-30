import React from "react";
import { ShieldCheck, HeartHandshake, Award, Clock } from "lucide-react";

const About = () => {
  return (
    <div className="container" style={{ padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem" }}>
          About RoomsForUse & HotelPro
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "3rem" }}>
          In today's fast-paced hospitality industry, managing hotel operations efficiently and securely is more crucial than ever. HotelPro offers a reliable and intuitive hotel management solution designed to meet the evolving needs of modern hospitality.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", textAlign: "left" }}>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <Award size={32} color="#2563eb" style={{ marginBottom: "0.75rem" }} />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>Scalable Backend</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              High-performance Node.js & MongoDB architecture handling high booking volumes effortlessly.
            </p>
          </div>

          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <ShieldCheck size={32} color="#16a34a" style={{ marginBottom: "0.75rem" }} />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>Secure Booking</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              End-to-end data encryption and JWT-based authentication ensuring every reservation is safe.
            </p>
          </div>

          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <HeartHandshake size={32} color="#ea580c" style={{ marginBottom: "0.75rem" }} />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>Guest First</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Simple date selection, real-time availability tracking, and one-click booking cancellations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
