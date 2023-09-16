const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const VIEWS_PATH = path.join(__dirname, "/views/");
const routes = require('./routes/event-api');
const ejs = require("ejs");
const PORT_NUMBER = 8080;

const Server = express();

Server.use(express.urlencoded({ extended: true }));
Server.use(express.static("node_modules/bootstrap/dist/css"));
Server.engine("html", ejs.renderFile);
Server.set("view engine", "html");
Server.set('view engine', 'ejs');
Server.set('views', path.join(__dirname, 'views'));
Server.use(bodyParser.json());

// Use the imported routes
Server.use('/lishen/api/v1/', routes);

Server.listen(PORT_NUMBER, function () {
    console.log(`Successfully initiated on port ${PORT_NUMBER}`)
});

// Add a catch-all route to handle requests with no pathname
Server.get('*', function(req, res) {
    const fileName = VIEWS_PATH + "index.html";
    res.render(fileName);
});
