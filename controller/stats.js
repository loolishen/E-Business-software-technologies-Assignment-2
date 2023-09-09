const Event = require("../models/student2-schema"); 

module.exports = {
    addEvent: async function (req, res) {
        try {
            const {
                name,
                description,
                startDateTime,
                durationInMinutes,
                capacity,
                categories
            } = req.body;

            // Validate the request data

            const newEvent = new Event({
                name,
                description,
                startDateTime,
                durationInMinutes,
                capacity,
                ticketsAvailable: capacity,
                categoryId: categories.split(","),
                categoryList: [], // Initialize as an empty array
            });

            // Save the new event to the database
            await newEvent.save();

            // Update the corresponding categories' event lists
            // Assuming you have a Category model and categoryController to handle this

            // Return the event ID in the response
            res.status(200).json({
                eventId: newEvent.id
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    listEvents: async function (req, res) {
        try {
            // Fetch all events and populate the 'categoryList' field
            const events = await Event.find().populate('categoryList').exec();
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    deleteEventById: async function (req, res) {
        try {
            const eventId = req.body.eventId; // Get event ID from request body
            const deletedEvent = await Event.findByIdAndRemove(eventId);

            if (!deletedEvent) {
                res.status(404).json({ error: 'Event not found' });
                return;
            }

            // Handle updating category event lists if needed
            // Assuming you have a Category model and categoryController to handle this

            res.status(200).json({
                acknowledged: true,
                deletedCount: 1
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    updateEventById: async function (req, res) {
        try {
            const {
                eventId,
                name,
                capacity
            } = req.body;

            const updatedEvent = await Event.findByIdAndUpdate(eventId, {
                name,
                capacity
            }, {
                new: true
            });

            if (!updatedEvent) {
                res.status(404).json({ status: 'Event not found' });
                return;
            }

            res.status(200).json({ status: 'updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};