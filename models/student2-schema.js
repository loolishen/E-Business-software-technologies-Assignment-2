/**
 * Represents an event in the application.
 *
 * @typedef {Object} Event
 * @property {string} id - The unique identifier for the event.
 * @property {string} name - The name of the event (required).
 * @property {string} description - The description of the event.
 * @property {Date} startDateTime - The starting date and time of the event (required).
 * @property {number} durationInMinutes - The duration of the event in minutes (required).
 * @property {boolean} isActive - Indicates if the event is currently active (default: true).
 * @property {string} image - The image associated with the event (default: "defaultImage.jpg").
 * @property {number} capacity - The maximum capacity for the event (default: 1000).
 * @property {number} ticketsAvailable - The number of tickets available for the event, initially set to the capacity.
 * @property {mongoose.Types.ObjectId[]} categoryList - An array of MongoDB ObjectIDs referencing event categories.
 */

/**
 * Represents a Mongoose schema for an event.
 *
 * @typedef {import("mongoose").Schema} EventSchema
 */

/**
 * Represents a Mongoose model for events.
 *
 * @typedef {import("mongoose").Model<Event>} EventModel
 */

const mongoose = require("mongoose");
const EventCat = require("../models/EventCategorySchema");

/**
 * The Mongoose schema for events.
 *
 * @type {EventSchema}
 */
const eventSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    startDateTime: {
        type: Date, 
        required: true,
    },
    durationInMinutes: {
        type: Number, 
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
        default: "defaultImage.jpg",
    },
    capacity: {
        type: Number,
        default: 1000,
        validate: {
            validator: function(value) {
                return value >= 10 && value <= 2000;
            },
            message: "Capacity must be between 10 and 2000 (inclusive)."
        }
    },
    ticketsAvailable: {
        type: Number,
        default: function () {
            return this.capacity;
        },
    },
    categoryList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: EventCat,
    }]
});

/**
 * The Mongoose model for events.
 *
 * @type {EventModel}
 */
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
