const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');

// Routes
router.post('/booking', bookingController.createBooking);
router.get('/bookinglist', bookingController.getBookings);
router.get('/booking/:id', bookingController.getBooking); // Corrected route parameter
router.put('/booking/:id', bookingController.updateBooking); // Corrected route parameter
router.delete('/booking/:id', bookingController.deleteBooking); // Corrected route parameter

module.exports = router;
