import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Services
export const registerUser = async (userData) => {
  const response = await api.post("/Signup", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/Login", credentials);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/getallusers");
  return response.data;
};

// Room Services
export const getAllRooms = async () => {
  const response = await api.get("/getallrooms");
  return response.data;
};

export const getRoomById = async (roomid) => {
  const response = await api.post("/getroombyid", { roomid });
  return response.data;
};

export const addRoom = async (roomData) => {
  const response = await api.post("/addroom", roomData);
  return response.data;
};

export const deleteRoom = async (id) => {
  const response = await api.delete(`/deleteroom/${id}`);
  return response.data;
};

// Booking Services
export const bookRoom = async (bookingData) => {
  const response = await api.post("/bookroom", bookingData);
  return response.data;
};

export const getBookingsByUserId = async (userid) => {
  const response = await api.post("/getbookingsbyuserid", { userid });
  return response.data;
};

export const getAllBookings = async () => {
  const response = await api.get("/getallbookings");
  return response.data;
};

export const cancelBooking = async (bookingid, roomid) => {
  const response = await api.post("/cancelbooking", { bookingid, roomid });
  return response.data;
};

export default api;
