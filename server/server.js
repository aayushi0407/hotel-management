const express = require("express");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const PORT = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Welcome / Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "HotelPro Backend API is running smoothly!",
    timestamp: new Date().toISOString(),
  });
});

// Primary API Routes & Root-Level Aliases (supporting both /api/* and root /* endpoints from course spec)
app.use("/api/users", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

// Direct root aliases as shown in the syllabus screenshots
app.use("/", authRoutes);
app.use("/", roomRoutes);
app.use("/", bookingRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    message: "Something went wrong on the server!",
    error: err.message,
  });
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
