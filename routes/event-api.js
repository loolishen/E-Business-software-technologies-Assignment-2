const express = require("express");
const router = express.Router();
const eventController = require("../controller/stats2");

// Create a new event
router.post("/add-event", eventController.addEvent);

// List all events
router.get("/events", eventController.listEvents);

// Delete an event by ID
router.delete('/delete-event', eventController.deleteEventById);

// Update an event by ID
router.put("/update-event", eventController.updateEventById);

module.exports = router;
