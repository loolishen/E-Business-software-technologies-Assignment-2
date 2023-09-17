const express = require('express');
const controller = require('../controller/event-controller'); // Import the controller
const router = express.Router();

router.post('/input', controller.createEvent);
router.get('/output', controller.getOutputPage);
router.get('/info', controller.getInfoPage);
router.get('/', controller.getIndexPage);
router.get('/input', controller.getInputPage);
router.get('/output', controller.getOutputPage);
router.get('/search-category', controller.searchCategory);
router.get('/event-details/:eventId', controller.getEventDetails);
router.get('/delete-category', controller.getDeleteCategoryPage);
router.post('/delete-category', controller.deleteCategory);

module.exports = router;
