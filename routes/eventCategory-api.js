const express = require("express");
const router = express.Router();
const eventCatCont = require("../controller/event-api-controller");

router.post("/createEventCategory", eventCatCont.createEventCat);
router.get("/list-eventCat", eventCatCont.getAll);
router.delete("/delete-eventCat", eventCatCont.deleteEventCatById);
router.put("/update-eventCat", eventCatCont.updateEventCatById);

module.exports = router;
