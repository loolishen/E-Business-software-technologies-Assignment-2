const mongoose = require('mongoose');
const alphanumericPattern = /^[a-zA-Z0-9\s]*$/;
const eventsCatSchema = new mongoose.Schema({
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
            return alphanumericPattern.test(value);
        },
        message: 'Name must contain only alphanumeric characters.',
      },
    },
    description: {
      type: String,
      required: true,
    },
    image: {
        type : String,
        required : false,
    },
    creationDate: {
      type: String,
      required: false,
    },
    eventsList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event', // Reference to the Event model
        },
    ],
  });

const EventCat = mongoose.model('EventsCat',eventsCatSchema);

module.exports = EventCat;
