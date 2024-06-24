const Booking = require('../model/booking');
const mongoose = require('mongoose')


// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { name, date, userId } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    // Create new booking
    const booking = new Booking({
      name,
      Date: date, // Ensure 'Date' matches the schema field
      userId
    });

    // Save booking
    await booking.save();

    // Respond with success message
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create booking" });
  }
};


// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId');
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting bookings' });
  }
};

// Get a single booking by ID
exports.getBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findById(id).populate('userId');
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
    } else {
      res.json(booking);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting booking' });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const { bookingStatus, paymentStatus, paymentMethod, paymentDate } = req.body;
    const booking = await Booking.findByIdAndUpdate(id, {
      bookingStatus,
      paymentStatus,
      paymentMethod,
      paymentDate,
    }, { new: true });
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
    } else {
      res.json(booking);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating booking' });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    await Booking.findByIdAndRemove(id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting booking' });
  }
};
