const express = require("express");
const router = express.Router();
const eventController = require("../controller/stats");

// Create a new event
router.post("/ls/api/v1/add-event", eventController.addEvent);

// List all events
router.get("/ls/api/v1/events", eventController.listEvents);

// Delete an event by ID
router.post("/ls/api/v1/delete-event", eventController.deleteEventById);

// Update an event by ID
router.post("/ls/api/v1/update-event", eventController.updateEventById);

module.exports = router;
