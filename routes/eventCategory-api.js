const express = require("express");
const router = express.Router();
const eventCatCont = require("../controller/event-api-controller");
/**
 * Route to create a new event category.
 * @function
 * @name POST /createEventCategory
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
router.post("/createEventCategory", eventCatCont.createEventCat);
/**
 * Route to get category.
 * @function
 * @name GET /getAll
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
router.get("/list-eventCat", eventCatCont.getAll);
/**
 * Route to create a new event category.
 * @function
 * @name DELETE /deleteEventCatById
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
router.delete("/delete-eventCat", eventCatCont.deleteEventCatById);
/**
 * Route to create a new event category.
 * @function
 * @name PUT /updateEventCatById
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
router.put("/update-eventCat", eventCatCont.updateEventCatById);

module.exports = router;
