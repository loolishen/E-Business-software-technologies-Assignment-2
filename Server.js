const express = require("express");
const path = require("path");
const VIEWS_PATH = path.join(__dirname, "/views/"); //Important
const EventsCat = require("./models/students");
const Events = require("./models/students2")
const ejs = require("ejs");
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
Server.post('/input',function (req,res){
    let anEvent = new EventsCat(req.body.eventName, req.body.description, req.body.image)
    console.log(anEvent)
    database.push(anEvent)
    res.redirect("/output")
});
Server.get('/output',function (req,res){
    fileName = VIEWS_PATH + "output.html";
    res.render(fileName,{records :database});
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
Server.get('/output',function (req,res){
    fileName = VIEWS_PATH + "output.html";
    res.render(fileName);
});
Server.get('/search-category',function (req,res){
    const keyword = req.query.keyword || 'default';
    if (!req.query.keyword || req.query.keyword.trim() === '') {
        res.redirect('/search-category?keyword=' + keyword);
        return;
    }
    const filteredCategories = database.filter(database => database.description.toLowerCase().includes(keyword.toLowerCase()));
    const fileName =  VIEWS_PATH +"search-category.html";
    res.render(fileName, { categories: filteredCategories, keyword });
});
Server.get('/event-details/:eventId', function(req, res){
    const eventId = req.params.eventId; // Get event ID from URL parameter
    const selectedEvent = event.find(e => e.id === eventId);

    if (!eventId) {
        res.status(400).send('Event ID not provided');
        return;
    }

    if (!selectedEvent) {
        res.status(404).send('Event not found');
        return;
    }
    // Calculate the end date/time by adding the duration to the start date/time
    const startDateTime = new Date(selectedEvent.startDateTime);
    const durationInMinutes = parseInt(selectedEvent.duration, 10);
    const endDateTime = new Date(startDateTime.getTime() + durationInMinutes * 60000); // Convert minutes to milliseconds
    const fileName = VIEWS_PATH + "event-details.html";
    res.render(fileName, {
        event: selectedEvent,
        endDateTime: endDateTime
    });
});
Server.get('/delete-category',function (req,res){
    fileName = VIEWS_PATH + "delete-category.html";
    res.render(fileName);
});
Server.post('/delete-category', (req, res) => {
    const categoryId = req.body.categoryId;
    const categoryIndex = database.findIndex(database => database.id === categoryId);

    if (categoryIndex !== -1) {
        // Using array slicing to remove the category
        database = [
            database.slice(0, categoryIndex),
            database.slice(categoryIndex + 1)
        ];

        res.redirect('/output');
    } else {
        res.status(404).json({ error: 'Category not found' });
    }
});
Server.use('/static', express.static(__dirname + '/static'));

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
Server.get('/ls/eventOngoing', function(req, res){
    const fileName = "allEvents";
    res.render(fileName, { events: event }); // Pass the event array to the template
})   

Server.get('/ls/event/sold-out', function(req,res){
    const fileName = "soldOutEvents";
    const availableEvents = event.filter(event => event.ticketsAvailable < 1); // Filter events with capacity < 1
    res.render(fileName, { events: availableEvents });
})

// Handle routes for event details and category details
Server.get('/ls/event/details/:eventId', function(req, res) {
    const eventId = req.params.eventId; // Get event ID from URL parameter
    const selectedEvent = event.find(e => e.id === eventId);

    if (!selectedEvent) {
        res.status(404).send('Event not found');
        return;
    }

    const fileName = "eventDetails"; 
    res.render(fileName, { event: selectedEvent });
});


Server.get('/ls/category/:categoryId', function(req, res){
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
Server.get('*', function(req, res) {
    const fileName = VIEWS_PATH + "index.html";
    res.render(fileName);
});