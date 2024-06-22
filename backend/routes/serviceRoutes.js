// routes/serviceRoutes.js

const express = require('express');
const router = express.Router();
const serviceController = require('../controller/userController'); // Adjust the path based on your project structure

const protect = require('../middleware/protect')
const admin = require("../middleware/admin")
// Route to create a new service
router.post('/services', serviceController.createService);

// Route to get all services
router.get('/serviceslist',protect, serviceController.getAllServices);

// Route to get a single service by ID
router.get('/services/:id',protect,admin, serviceController.getServiceById);

// Route to update a service by ID
router.put('/services/:id',protect,admin, serviceController.updateService);

// Route to delete a service by ID
router.delete('/services/:id',protect,admin, serviceController.deleteService);

module.exports = router;
