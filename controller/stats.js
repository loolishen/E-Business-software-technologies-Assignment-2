const StudentSchema = require("../models/student-schema");

module.exports = {
    createEventCat: async (req, res) => {
        let anEventCat = new StudentSchema({id : IDGenerator(), name:req.body.name,description : req.body.description, image : req.body.image, creationDate : DateGenerator()})
        await anEventCat.save();
        res.json(anEventCat)
    },

    getAll: async function (req, res) {
        try {
            const categories = await StudentSchema.find().populate('eventsList');
            res.json(categories);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteEventCatById: async function (req, res) {
        try {
            const eventCatID = req.body.id;

            // Find the event category by its ID
            const eventCat = await StudentSchema.findOne({ id: eventCatID });

            if (!eventCat) {
                return res.status(404).json({ error: 'Event Category not found' });
            }

            // Log the _id of the event category
            console.log('Event Category ID:', eventCat._id);

            // Delete the event category
            await StudentSchema.findByIdAndRemove(eventCat._id);

            res.status(200).json({
                acknowledged: true,
                deletedCount: 1,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateEventCatById: async function (req, res) {
        try {
            const eventCatID = req.params.id;
            const updatedCategory = await StudentSchema.findByIdAndUpdate(
                eventCatID,
                {
                    name: req.body.name,
                    description: req.body.description,
                    image: req.body.image,
                    creationDate: DateGenerator(),
                },
                { new: true }
            );

            if (!updatedCategory) {
                res.status(404).json({ error: 'Event Category not found' });
                return;
            }

            res.status(200).json(updatedCategory);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
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
