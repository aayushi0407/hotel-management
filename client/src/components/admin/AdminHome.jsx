import React, { useState } from "react";
import AllBookingsTab from "./AllBookingsTab";
import AllRoomsTab from "./AllRoomsTab";
import AddRoomTab from "./AddRoomTab";
import AllUsersTab from "./AllUsersTab";
import { BookOpen, BedDouble, PlusSquare, Users } from "lucide-react";

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
      {/* Admin Tabs Navigation matching Screenshot 11 */}
      <div className="admin-tabs-nav">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`admin-tab-btn ${activeTab === "bookings" ? "active" : ""}`}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <BookOpen size={16} />
            <span>ALL BOOKINGS</span>
          </span>
        </button>

        <button
          onClick={() => setActiveTab("rooms")}
          className={`admin-tab-btn ${activeTab === "rooms" ? "active" : ""}`}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <BedDouble size={16} />
            <span>ALL ROOMS</span>
          </span>
        </button>

        <button
          onClick={() => setActiveTab("addroom")}
          className={`admin-tab-btn ${activeTab === "addroom" ? "active" : ""}`}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <PlusSquare size={16} />
            <span>ADD ROOM</span>
          </span>
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`admin-tab-btn ${activeTab === "users" ? "active" : ""}`}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <Users size={16} />
            <span>ALL USER</span>
          </span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "bookings" && <AllBookingsTab />}
        {activeTab === "rooms" && (
          <AllRoomsTab onNavigateToAddRoom={() => setActiveTab("addroom")} />
        )}
        {activeTab === "addroom" && (
          <AddRoomTab onRoomAdded={() => setActiveTab("rooms")} />
        )}
        {activeTab === "users" && <AllUsersTab />}
      </div>
    </div>
  );
};

export default AdminHome;
