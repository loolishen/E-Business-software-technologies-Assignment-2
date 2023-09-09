const mongoose = require("mongoose");

const student2Schema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
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
});

// Create a Mongoose model based on the schema
const Student2 = mongoose.model("Student2", student2Schema);

module.exports = Student2;
