const express= require("express")
const eventCatCont = require("../controller/stats")
const router = express.Router();
router.post("/33349800/api/v1/createEvenetCategory", eventCatCont.createEventCat)
router.get("/33349800/api/v1/list-event", eventCatCont.getAll)
router.get("/33349800/api/v1/delete-event", eventCatCont.deleteEventCatById)
router.put("/33349800/api/v1/add-event", eventCatCont.addEvent)
module.exports = router;