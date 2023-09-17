const Student2Schema = require("../models/student2-schema");
const EventCat = require("../models/EventCategorySchema");

// Initialize counters for Add, Update, and Delete operations
let addCount = 0;
let updateCount = 0;
let deleteCount = 0;

module.exports = {
    addEvent: async function (req, res) {
    const eventId = IDGenerator();
      try {
        // Create a new category
        const categoryResponse = await fetch('http://localhost:8080/33349800/api/v1/createEventCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!categoryResponse.ok) {
            // Handle the case where category creation fails
            res.status(500).json({ error: 'Category creation failed' });
            return;
        }

        const categoryData = await categoryResponse.json();

        let newEvent = new Student2Schema(
            {id: eventId, name:req.body.name ,description : req.body.description,
                startDateTime : req.body.startDateTime, durationInMinutes : req.body.durationInMinutes,
                isActive : req.body.isActive, image : req.body.image, capacity : req.body.capacity,
                ticketsAvailable : req.body.ticketsAvailable, categoryList : [categoryData._id]})
  
        // Save the new event to the database
        await newEvent.save();
        addCount++;
  
        // Return the event ID in the response
        res.status(200).json({
            eventId: eventId, // Return the generated event ID
        });

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },

    listEvents: async function (req, res) {
        try {
            // Fetch all events and populate the 'categoryList' field with category details
            const events = await Student2Schema.find()
                .populate({
                    path: 'categoryList',
                    model: EventCat, // Reference to the EventCat model
                })
                .exec();
    
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
      

    deleteEventById: async function (req, res) {
        try {
            // Get the event ID from the request body
            const eventId = req.body.eventId;

            // Delete the event
            const deletedEvent = await Student2Schema.deleteOne({ id: eventId });

            if (!deletedEvent) {
                res.status(404).json({ error: 'Event not found' });
                return;
            }

            deleteCount++;

            res.status(200).json({
                acknowledged: true,
                deletedCount: 1,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    

    updateEventById: async function (req, res) {
        try {
            const { eventId, name, description, startDateTime, durationInMinutes, isActive, image, capacity, ticketsAvailable } = req.body;
    
            // Find the event by eventId and update its fields
            const updatedEvent = await Student2Schema.findOneAndUpdate({ id: eventId }, {
                name,
                description,
                startDateTime,
                durationInMinutes,
                isActive,
                image,
                capacity,
                ticketsAvailable
            }, {
                new: true
            });
    
            if (!updatedEvent) {
                res.status(404).json({ status: 'Event not found' });
                return;
            }
    
            updateCount++;
            res.status(200).json({ status: 'updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'Internal Server Error' });
        }
    },
    
    // Getter function to retrieve counts
    getOperationCounts: function (req, res) {
        res.status(200).json({
            addCount,
            updateCount,
            deleteCount,
        });
    },
    

}

function IDGenerator(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'E';

    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    result += '-';

    for (let i = 0; i < 4; i++) {
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