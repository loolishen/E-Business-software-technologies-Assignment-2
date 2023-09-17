const EventsCat = require('../models/students');
const path = require("path"); // Replace with your actual model
const VIEWS_PATH = path.join(__dirname, "/views/"); //Important
let database = []; // Initialize an empty array to store events
const createEvent = (req, res) => {
    const { eventName, description, image } = req.body;
    const anEvent = new EventsCat(eventName, description, image);
    console.log(anEvent);
    database.push(anEvent);
    res.redirect("/output");
};
const getDeleteCategoryPage = (req, res) => {
    const fileName = VIEWS_PATH + "delete-category.html";
    res.render(fileName);
};
const getOutputPage = (req, res) => {
    const fileName = VIEWS_PATH + "output.html";
    res.render(fileName, { records: database });
};

const getInfoPage = (req, res) => {
    const fileName = VIEWS_PATH + "info.html";
    res.render(fileName);
};

const getIndexPage = (req, res) => {
    const fileName = VIEWS_PATH + "index.html";
    res.render(fileName);
};

const getInputPage = (req, res) => {
    const fileName = VIEWS_PATH + "input.html";
    res.render(fileName);
};

const searchCategory = (req, res) => {
    const keyword = req.query.keyword || 'default';
    if (!req.query.keyword || req.query.keyword.trim() === '') {
        res.redirect('/search-category?keyword=' + keyword);
        return;
    }
    const filteredCategories = database.filter(database => database.description.toLowerCase().includes(keyword.toLowerCase()));
    const fileName =  VIEWS_PATH + "search-category.html";
    res.render(fileName, { categories: filteredCategories, keyword });
};

const getEventDetails = (req, res) => {
    const eventId = req.params.eventId;
    const selectedEvent = database.find(event => event.id === eventId);

    if (!eventId) {
        res.status(400).send('Event ID not provided');
        return;
    }

    if (!selectedEvent) {
        res.status(404).send('Event not found');
        return;
    }

    const startDateTime = new Date(selectedEvent.startDateTime);
    const durationInMinutes = parseInt(selectedEvent.duration, 10);
    const endDateTime = new Date(startDateTime.getTime() + durationInMinutes * 60000);
    const fileName = VIEWS_PATH + "event-details.html";
    res.render(fileName, {
        event: selectedEvent,
        endDateTime: endDateTime
    });
};

const deleteCategory = (req, res) => {
    const categoryId = req.body.categoryId;
    const categoryIndex = database.findIndex(event => event.id === categoryId);

    if (categoryIndex !== -1) {
        database.splice(categoryIndex, 1);
        res.redirect('/output');
    } else {
        res.status(404).json({ error: 'Category not found' });
    }
};

module.exports = {
    createEvent,
    getOutputPage,
    getInfoPage,
    getIndexPage,
    getInputPage,
    searchCategory,
    getEventDetails,
    deleteCategory,
    getDeleteCategoryPage
};
