const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    id: {
        type: String,
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

    categoryId: {
        type: String, 
        required: true,
    },

    categoryList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' // Assuming 'Category' is the name of your category model
    }]
});

// Create a Mongoose model based on the schema
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
