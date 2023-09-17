const StudentSchema = require("../models/EventCategorySchema");
const Operation = require('../models/operations');  // Import the Operation schema

const operationController = {
    /**
     * Function to increment the update count.
     * @async
     * @function
     * @returns {Promise<void>}
     */
    incrementUpdateCount: async () => {
        try {
            const operation = await Operation.findOne({});
            if (operation) {
                operation.updateCount += 1;
                await operation.save();
            } else {
                await Operation.create({ updateCount: 1 });
            }
        } catch (error) {
            console.error('Error incrementing update count:', error);
        }
    },

    /**
     * Function to increment the delete count.
     * @async
     * @function
     * @returns {Promise<void>}
     */
    incrementDeleteCount: async () => {
        try {
            const operation = await Operation.findOne({});
            if (operation) {
                operation.deleteCount += 1;
                await operation.save();
            } else {
                await Operation.create({ deleteCount: 1 });
            }
        } catch (error) {
            console.error('Error incrementing delete count:', error);
        }
    },

    /**
     * Function to get the operation counts.
     * @async
     * @function
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @returns {Promise<void>}
     */
    getOperationCounts: async (req, res) => {
        try {
            const operation = await Operation.findOne({});
            res.status(200).json({
                updateCount: operation ? operation.updateCount : 0,
                deleteCount: operation ? operation.deleteCount : 0,
            });
        } catch (error) {
            console.error('Error getting operation counts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};


module.exports = {
    createEventCat: async (req, res) => {
        let anEventCat = new StudentSchema({id : IDGenerator(), name:req.body.name,description : req.body.description, image : req.body.image, creationDate : DateGenerator()})
        await anEventCat.save();
        res.status(200).json({
            id : anEventCat.id});
    },
    /**
     * Get all event categories.
     * @async
     * @function
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @returns {Promise<void>}
     */
    getAll: async function (req, res) {
        try {
            const categories = await StudentSchema.find().populate('eventsList');
            res.json(categories);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    /**
     * Delete an event category by ID.
     * @async
     * @function
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @returns {Promise<void>}
     */
    deleteEventCatById: async function (req, res) {
        try {
            const eventCatID = req.body.categoryId;
            const deleteEvent = await StudentSchema.deleteOne({id : eventCatID})
            await operationController.incrementDeleteCount();
            res.json(deleteEvent)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    /**
     * Update an event category by ID.
     * @async
     * @function
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @returns {Promise<void>}
     */
    updateEventCatById: async function (req, res) {
        try {
            const eventCatID = req.body.categoryId;
            const updatedCategory = await StudentSchema.findOneAndUpdate(
                { id: eventCatID },
                {
                    name: req.body.name,
                    description: req.body.description,
                    image: req.body.image,
                    creationDate: DateGenerator(),
                },
                { new: true }
            );
            // Increment the update count
            await operationController.incrementUpdateCount();
            if (!updatedCategory) {
                res.status(404).json({ error: 'Event Category ID not found' });
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
