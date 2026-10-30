const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      default: 1,
    },
    rent: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    photos: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    currentbooking: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const roomModel = mongoose.model("rooms", roomSchema);
module.exports = roomModel;
