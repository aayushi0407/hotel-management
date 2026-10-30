const express = require("express");
const router = express.Router();
const roomModel = require("../models/roomModel");

// Add Room (Admin) - matches screenshot exactly
router.post("/addroom", async (req, res) => {
  try {
    const newRoom = new roomModel(req.body);
    const room = await newRoom.save();
    res.status(200).send(room);
  } catch (error) {
    console.error("Add room error:", error);
    res.status(500).send({ message: "Failed to add room", error: error.message });
  }
});

// Get all rooms
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await roomModel.find().sort({ createdAt: -1 });
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Get rooms error:", error);
    res.status(500).json({ message: "Failed to fetch rooms", error: error.message });
  }
});

// Get room by ID
router.post("/getroombyid", async (req, res) => {
  try {
    const { roomid } = req.body;
    const room = await roomModel.findById(roomid);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error("Get room by id error:", error);
    res.status(500).json({ message: "Error fetching room", error: error.message });
  }
});

// Delete room
router.delete("/deleteroom/:id", async (req, res) => {
  try {
    const room = await roomModel.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully", room });
  } catch (error) {
    console.error("Delete room error:", error);
    res.status(500).json({ message: "Error deleting room", error: error.message });
  }
});

module.exports = router;
