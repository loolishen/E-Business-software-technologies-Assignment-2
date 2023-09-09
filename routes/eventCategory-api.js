const express= require("express")
const eventCatCont = require("../controller/eventCategory-controller")
const router = express.Router();
router.post("/", eventCatCont.createEventCat)
router.get("/", eventCatCont.getAll)
router.put("/", eventCatCont.addEvent)
module.exports = router;