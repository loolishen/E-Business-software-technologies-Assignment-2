const express= require("express")
const eventCatCont = require("../controller/stats")
const router = express.Router();
router.post("/33349800/api/v1/createEventCategory", eventCatCont.createEventCat)
router.get("/33349800/api/v1/list-eventCat", eventCatCont.getAll)
router.get("/33349800/api/v1/delete-eventCat", eventCatCont.deleteEventCatById)
router.put("/33349800/api/v1/add-eventCat", eventCatCont.addEvent)
router.post("/33349800/api/v1/delete-eventCat", eventCatCont.deleteEventCatById)
router.post("/33349800/api/v1/update-eventCat", eventCatCont.updateEventCatById)
module.exports = router;