import React from "react";
import { Hotel, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer style={{ background: "#0f172a", color: "#94a3b8", padding: "3rem 1.5rem 2rem", marginTop: "4rem" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", marginBottom: "2rem" }}>
          <div style={{ maxWidth: "360px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "white", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              <Hotel size={24} color="#38bdf8" />
              <span>RoomsForUse</span>
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              HotelPro - Complete hotel booking and management solution. Streamline your hotel reservations, room inventories, and guest satisfaction with elegance and speed.
            </p>
          </div>

          <div>
            <h4 style={{ color: "white", marginBottom: "1rem", fontSize: "1rem" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li><a href="/" style={{ color: "#94a3b8" }}>Home</a></li>
              <li><a href="/login" style={{ color: "#94a3b8" }}>Customer Login</a></li>
              <li><a href="/signup" style={{ color: "#94a3b8" }}>Register Account</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: "white", marginBottom: "1rem", fontSize: "1rem" }}>Support & Contact</h4>
            <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>24/7 Hospitality Support</p>
            <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>support@roomsforuse.com</p>
            <p style={{ fontSize: "0.9rem" }}>+91 (0) 970-492-7807</p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #1e293b", paddingTop: "1.5rem", textAlign: "center", fontSize: "0.85rem" }}>
          © {new Date().getFullYear()} HotelPro / RoomsForUse. Built with MERN Stack. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
