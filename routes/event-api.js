const express = require("express");
const router = express.Router();
const eventController = require("../controller/stats2");

// Create a new event
/**
 * Route to create a new event.
 * @name POST /add-event
 * @function
 * @memberof module:EventRouter
 * @inner
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @throws {Error} If an internal server error occurs.
 */
router.post("/add-event", eventController.addEvent);

// List all events
/**
 * Route to list all events.
 * @name GET /events
 * @function
 * @memberof module:EventRouter
 * @inner
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @throws {Error} If an internal server error occurs.
 */
router.get("/events", eventController.listEvents);

// Delete an event by ID
/**
 * Route to delete an event by its ID.
 * @name DELETE /delete-event
 * @function
 * @memberof module:EventRouter
 * @inner
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @throws {Error} If an internal server error occurs or if the event is not found.
 */
router.delete('/delete-event', eventController.deleteEventById);

// Update an event by ID

/**
 * Route to update an event by its ID.
 * @name PUT /update-event
 * @function
 * @memberof module:EventRouter
 * @inner
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @throws {Error} If an internal server error occurs or if the event is not found.
 */
router.put("/update-event", eventController.updateEventById);

module.exports = router;
