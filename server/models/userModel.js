const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is require"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is require"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is require"],
    },
    phone: {
      type: Number,
      required: [true, "Phone is require"],
    },
    userType: {
      type: String,
      required: [true, "UserType is require"],
      default: "Ordinary",
      enum: ["Ordinary", "Admin", "Customer", "ordinary", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
