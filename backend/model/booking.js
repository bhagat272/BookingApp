const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  Date: {
    type: Date, // Ensure 'Date' with an uppercase 'D'
    required: true,
  },
  bookingStatus: {
    type: String,
    default: "pending",
  },
  paymentStatus: {
    type: String,
    default: "unpaid",
  },
  paymentMethod: {
    type: String,
  },
  paymentDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
