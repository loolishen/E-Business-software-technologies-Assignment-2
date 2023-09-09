const mongoose = require('mongoose');


const eventsCatSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Your alphanumeric validation logic here
          // ...
        },
        message: 'Name must contain only alphanumeric characters.',
      },
    },
    description: {
      type: String,
      required: true,
    },
    image: String,
    creationDate: {
      type: String,
      required: true,
    },
    eventsList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student2',
      },
    ],
  });

const EventsCat = mongoose.model('EventsCat', eventsCatSchema);

module.exports = EventsCat;
