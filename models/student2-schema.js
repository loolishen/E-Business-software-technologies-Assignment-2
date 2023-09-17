const mongoose = require("mongoose");
const StudentSchema = require("../models/student-schema");
const EventCat = require("../models/student-schema");

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
        ref: EventCat
    }]
});

// Create a Mongoose model based on the schema
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
