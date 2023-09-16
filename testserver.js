const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const VIEWS_PATH = path.join(__dirname, "/views/");
const routes = require('./routes/event-api');
const eventCatRoutes = require('./routes/eventCategory-api');
const ejs = require("ejs");
const PORT_NUMBER = 8080;
const Server = express();
Server.use(express.urlencoded({ extended: true }));
Server.use(express.static("node_modules/bootstrap/dist/css"));
Server.engine("html", ejs.renderFile);
Server.set("view engine", "html");
Server.set('view engine', 'ejs');
Server.set('views', path.join(__dirname, 'views'));
Server.use(express.json());

const url = "mongodb://127.0.0.1:27017/";

async function connect(url) {
    await mongoose.connect(url);
    return "Connected Successfully to mongoDB";
}
Server.use(bodyParser.json());
// Use the imported routes
Server.use('/lishen/api/v1/', routes);
Server.use('/33349800/api/v1',eventCatRoutes);
Server.listen(PORT_NUMBER, function () {
    console.log(`Successfully initiated on port ${PORT_NUMBER}`)
});

// Add a catch-all route to handle requests with no pathname
Server.get('*', function(req, res) {
    const fileName = VIEWS_PATH + "index.html";
    res.render(fileName);
});
connect(url)
    .then(console.log)
    .catch((err) => console.log(err));
