const express = require("express");
const router = express.Router();
const bookingModel = require("../models/bookingModel");
const roomModel = require("../models/roomModel");

// Book Room
router.post("/bookroom", async (req, res) => {
  const {
    roomid,
    type,
    userid,
    username,
    fromdate,
    todate,
    totalAmount,
    totaldays,
    phone,
    cardDetails,
  } = req.body;

  try {
    const newBooking = new bookingModel({
      roomid,
      type,
      userid,
      username,
      fromdate,
      todate,
      totalAmount,
      totaldays,
      phone,
      cardDetails,
      status: "booked",
    });

    const booking = await newBooking.save();

    // Push booking reference to the room's currentbooking array
    const room = await roomModel.findById(roomid);
    if (room) {
      room.currentbooking.push({
        bookingid: booking._id,
        fromdate: fromdate,
        todate: todate,
        userid: userid,
        status: "booked",
      });
      await room.save();
    }

    res.status(200).json({
      message: "Room Booked Successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Failed to book room", error: error.message });
  }
});

// Get user bookings by user ID
router.post("/getbookingsbyuserid", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await bookingModel.find({ userid: userid }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get user bookings error:", error);
    res.status(500).json({ message: "Error fetching user bookings", error: error.message });
  }
});

// Get all bookings (Admin)
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await bookingModel.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get all bookings error:", error);
    res.status(500).json({ message: "Error fetching all bookings", error: error.message });
  }
});

// Cancel Booking
router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const bookingItem = await bookingModel.findById(bookingid);
    if (!bookingItem) {
      return res.status(404).json({ message: "Booking not found" });
    }

    bookingItem.status = "cancelled";
    await bookingItem.save();

    if (roomid) {
      const room = await roomModel.findById(roomid);
      if (room) {
        const bookings = room.currentbooking;
        const temp = bookings.filter(
          (b) => b.bookingid && b.bookingid.toString() !== bookingid.toString()
        );
        room.currentbooking = temp;
        await room.save();
      }
    }

    res.status(200).json({
      message: "Your booking has been cancelled successfully",
      booking: bookingItem,
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Error cancelling booking", error: error.message });
  }
});

module.exports = router;
