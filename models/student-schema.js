const mongoose = require('mongoose');


const eventsCatSchema = new mongoose.Schema({
  id: String, // You can use String for the autogenerated ID
  name: String,
  description: String,
  image: String, 
  creationDate: String, 
});

const EventsCat = mongoose.model('EventsCat', eventsCatSchema);

module.exports = EventsCat;
