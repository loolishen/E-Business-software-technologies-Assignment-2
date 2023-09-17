const express = require("express");
const path = require("path");
const VIEWS_PATH = path.join(__dirname, "/views/"); //Important
const EventsCat = require("./models/EventCategorySchema");
const Events = require("./models/student2-schema");
const ejs = require("ejs");
const mongoose = require("mongoose");
const eventCatRoutes = require("./routes/eventCategory-api");
const url = "mongodb://127.0.0.1:27017/";

async function connect(url) {
    await mongoose.connect(url);
    return "Connected Successfully to mongoDB";
}
const PORT_NUMBER = 8080;
let database = []
let event = []
let Server = express();
Server.use(express.urlencoded({ extended: true }));
Server.use(express.static("node_modules/bootstrap/dist/css"));
Server.engine("html", ejs.renderFile);
Server.set("view engine", "html");
Server.set('view engine', 'ejs');
Server.set('views', path.join(__dirname, 'views'));

Server.listen(PORT_NUMBER, function (){
    console.log(`Successfully initiated on port ${PORT_NUMBER}`)
});
/**
 * Handle POST request for creating a new event category.
 *
 * @function
 * @async
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void}
 */
Server.post('/input', async function (req, res) {
    let anEventCat = new EventsCat({
        id: IDGenerator(),
        name: req.body.eventName,
        description: req.body.description,
        image: req.body.image,
        creationDate: DateGenerator()
    });
    await anEventCat.save();
    // Redirect to '/output'
    res.redirect('/output');
});
/**
 * Handle GET request to display a list of events.
 *
 * @function
 * @async
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void}
 */
Server.get('/output', async (req, res) => {
    try {
        fileName = VIEWS_PATH + "output.html";
        const categories = await EventsCat.find().populate('eventsList');
        res.render(fileName, { records: categories});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
Server.get('/info',function (req,res){
    fileName = VIEWS_PATH + "info.html";
    res.render(fileName);
});
Server.get('/',function (req,res){
    const fileName = VIEWS_PATH + "index.html";
    res.render(fileName);
});
Server.get('/input',function (req,res){
    fileName = VIEWS_PATH + "input.html";
    res.render(fileName);
});

Server.get('/search-category',async function (req,res){
    const keyword = req.query.keyword || 'default';
    if (!req.query.keyword || req.query.keyword.trim() === '') {
        res.redirect('/search-category?keyword=' + keyword);
        return;
    }
    const filteredCategories = await EventsCat.find({
        description: { $regex: new RegExp(keyword) } // Case-sensitive partial match
    });

    const fileName =  VIEWS_PATH +"search-category.html";
    res.render(fileName, { categories: filteredCategories, keyword });
});
Server.get('/event-details/:eventId', async function(req, res) {
    const eventId = req.params.eventId; // Get event ID from URL parameter
    if (!eventId) {
        res.status(400).send('Event ID not provided');
        return;
    }
    try {
        // Retrieve the event details from the "Events" schema
        const selectedEvent = await Events.findOne({ id: eventId });
        if (!selectedEvent) {
            res.status(404).send('Event not found');
            return;
        }
        // Calculate the end date/time by adding the duration to the start date/time
        const startDateTime = new Date(selectedEvent.startDateTime);
        const durationInMinutes = parseInt(selectedEvent.durationInMinutes, 10);  // Parse duration as an integer
        const endDateTime = new Date(startDateTime.getTime() + durationInMinutes * 60000);
        const fileName = VIEWS_PATH + "event-details.html";
        res.render(fileName, {
            event: selectedEvent,
            endDateTime: endDateTime
        });
    } catch (error) {
        console.error('Error fetching event details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

Server.get('/delete-category',function (req,res){
    fileName = VIEWS_PATH + "delete-category.html";
    res.render(fileName);
});
Server.post('/delete-category', async (req, res) => {
    try {
        const categoryId = req.body.categoryId;
        // Use Mongoose to delete the category by ID
        const deletedEvent = await EventsCat.findOneAndDelete({ id: categoryId });
        if (deletedEvent) {
            // Category was found and deleted
            res.redirect('/output');
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
Server.use('/static', express.static(__dirname + '/static'));
Server.use('/33349800/api/v1',eventCatRoutes);
/**
 * Generate a random ID.
 *
 * @function
 * @returns {string} The generated ID.
 */
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
/**
 * Generate a random date.
 *
 * @function
 * @returns {string} The generated date.
 */
function DateGenerator(){
    function randomNumberGenerator(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return randomNumberGenerator(1,30) + " - " + randomNumberGenerator(1,12) + " - " + randomNumberGenerator(2017, 2023)
}
// LiShen's CODE

// Display the form for adding an event
Server.get('/ls/event/add', function (req, res) {
    const fileName = VIEWS_PATH + "add.html"
    res.sendFile(fileName)
});

// Handle POST request for adding an event
Server.post('/ls/event/add', function(req, res) {
    const { eventName, startDateTime, duration, categoryId, eventDescription, eventImage, capacity, ticketsAvailable, isActive } = req.body;
    const id = Events.IDGenerator(); // Call the IDGenerator function to get a new ID
    const newEvent = { id, eventName, startDateTime, duration, categoryId, eventDescription, eventImage, capacity, ticketsAvailable, isActive };
    event.push(newEvent);
    res.redirect('/ls/eventOngoing'); // Redirect to the eventOngoing page after adding the event
})

// Display all ongoing events
Server.get('/ls/eventOngoing', async function (req, res) {
    try {
        fileName = VIEWS_PATH + "allEvents";
        const events = await Events.find().populate('categoryList');
        res.render(fileName, { events: events });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
Server.get('/ls/event/sold-out', function (req, res) {
    const fileName = "soldOutEvents";
    const availableEvents = event.filter(event => event.ticketsAvailable < 1); // Filter events with capacity < 1
    res.render(fileName, {events: availableEvents});
})

// Handle routes for event details and category details
Server.get('/ls/event/details/:eventId', function (req, res) {
    const eventId = req.params.eventId; // Get event ID from URL parameter
    const selectedEvent = event.find(e => e.id === eventId);

    if (!selectedEvent) {
        res.status(404).send('Event not found');
        return;
    }

    const fileName = "eventDetails";
    res.render(fileName, {event: selectedEvent});
});


Server.get('/ls/category/:categoryId', function (req, res) {
    const categoryId = req.params.categoryId;
    const selectedCategory = database.find(cat => cat.id === categoryId); // Find the selected category

    if (!selectedCategory) {
        res.status(404).send('Category not found');
        return;
    }

    // Calculate the end date/time by adding the duration to the start date/time
    const startDateTime = new Date(selectedCategory.startDateTime);
    const durationInMinutes = parseInt(selectedCategory.duration, 10);
    const endDateTime = new Date(startDateTime.getTime() + durationInMinutes * 60000); // Convert minutes to milliseconds

    const fileName = 'categoryDetails';
    res.render(fileName, {
        event: selectedCategory,
        endDateTimes: endDateTime
    });
});

// Remove an event from the event array
Server.get('/ls/event/remove', (req, res) => {
    const eventId = req.query.id; // Get event ID from query string
    const eventIndex = event.findIndex(e => e.id === eventId); // Find the index of the event
    if (eventIndex !== -1) {
        event.splice(eventIndex, 1); // Remove the event from the array
        res.redirect('/ls/eventOngoing'); // Redirect to the "list all events" page
    } else {
        res.status(404).send('Event not found'); // Handle event not found
    }
});
// Add a catch-all route to handle requests with no pathname
Server.get('*', function (req, res) {
    const fileName = VIEWS_PATH + "index.html";
    res.render(fileName);
});
connect(url)
.then(console.log)
.catch((err) => console.log(err));
