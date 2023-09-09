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