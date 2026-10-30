const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userModel = require("./models/userModel");
const roomModel = require("./models/roomModel");
const bookingModel = require("./models/bookingModel");

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hotel";
    console.log(`Connecting to ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding!");

    // Clear existing data optionally
    await userModel.deleteMany({});
    await roomModel.deleteMany({});
    await bookingModel.deleteMany({});
    console.log("Existing collections cleared.");

    // Create Admin and Ordinary User
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    const admin = await userModel.create({
      name: "Admin Chirag",
      email: "admin@hotelpro.com",
      password: adminPassword,
      phone: 9876543210,
      userType: "Admin",
    });

    const customer = await userModel.create({
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      password: userPassword,
      phone: 9704927807,
      userType: "Ordinary",
    });

    console.log("Users created successfully:");
    console.log(" - Admin: admin@hotelpro.com (Password: admin123)");
    console.log(" - User: rahul@gmail.com (Password: user123)");

    // Sample Rooms matching the screenshots
    const sampleRooms = [
      {
        roomNumber: 101,
        count: 5,
        rent: 1000,
        type: "ordinary",
        photos: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        ],
        description: "Welcome to Roomly. Comfortable ordinary room with air conditioning, queen size bed, free high speed Wi-Fi, and 24/7 room service.",
        currentbooking: [],
      },
      {
        roomNumber: 102,
        count: 4,
        rent: 2400,
        type: "Delux",
        photos: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        ],
        description: "Spacious Deluxe Room featuring premium king size bed, stunning city view balcony, private jacuzzi, mini-bar, and smart HD entertainment system.",
        currentbooking: [],
      },
      {
        roomNumber: 201,
        count: 3,
        rent: 4500,
        type: "Suite",
        photos: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        ],
        description: "Luxury Presidential Suite with separate living room lounge, panoramic glass windows, executive dining table, master bedroom and butler service.",
        currentbooking: [],
      },
      {
        roomNumber: 202,
        count: 6,
        rent: 1800,
        type: "Non-Delux",
        photos: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        ],
        description: "Standard Non-Deluxe room ideal for solo travelers and business trips. Includes workstation desk, complimentary breakfast, and hot shower.",
        currentbooking: [],
      },
    ];

    const createdRooms = await roomModel.insertMany(sampleRooms);
    console.log(`Created ${createdRooms.length} sample rooms!`);

    // Sample Booking
    const sampleBooking = await bookingModel.create({
      roomid: createdRooms[1]._id,
      type: "Delux",
      userid: customer._id,
      username: customer.name,
      fromdate: "2026-11-01",
      todate: "2026-11-03",
      totalAmount: 4800,
      totaldays: 2,
      phone: customer.phone,
      cardDetails: {
        cardholdername: customer.name,
        cardnumber: "4111222233334444",
        cvvcode: "123",
        expmonthyear: "12/28",
      },
      status: "booked",
    });

    createdRooms[1].currentbooking.push({
      bookingid: sampleBooking._id,
      fromdate: "2026-11-01",
      todate: "2026-11-03",
      userid: customer._id,
      status: "booked",
    });
    await createdRooms[1].save();

    console.log("Sample booking created successfully!");
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
