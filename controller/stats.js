const StudentSchema = require("../models/student-schema");
const Student2Schema = require("../models/student2-schema");

module.exports = {
    createEventCat: async function (req, res) {
        let anEventCat = new StudentSchema({ id: IDGenerator(), name:req.body.name, description: req.body.description, image:req.body.image, creationDate: DateGenerator()});
        await anEventCat.save();
        res.json(anEventCat);
    },
    getAll: async function (req, res) {
        let Restaurants = await StudentSchema.find().populate("eventsList");
        res.json(Restaurants);
    },
    addEvent: async function (req, res) {
        let eventID = req.body.eventID;
        let eventCatID = req.body.eventCatID;
        let theEvent = await Student2Schema.findOne({ _id: eventID });
        let theEventCat = await StudentSchema.findOne({ _id: eventCatID });
        theEventCat.meals.push(theEvent._id);
        await theEventCat.save();
        res.redirect("/rest"); // To be continued
    },
};
function IDGenerator() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'C';
    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    result += '-';
    for (let j = 0; j < 4; j++) {
        const randomDigit = Math.floor(Math.random() * 10);
        result += randomDigit;
    }
    return result;
}
function DateGenerator(){
    function randomNumberGenerator(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return randomNumberGenerator(1,30) + " - " + randomNumberGenerator(1,12) + " - " + randomNumberGenerator(2017, 2023)
}

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

            const newEvent = new Student2Schema({
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
            const events = await Student2Schema.find().populate('categoryList').exec();
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    deleteEventById: async function (req, res) {
        try {
            const eventId = req.body.eventId; // Get event ID from request body
            const deletedEvent = await Student2Schema.findByIdAndRemove(eventId);

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

            const updatedEvent = await Student2Schema.findByIdAndUpdate(eventId, {
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
