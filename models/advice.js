const mongoose = require('mongoose')

//the 'model' of the clinic subscriber
const adviceSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    advices: {
        type: Array, /*arrays (["Hej, hej","Skärp dig"])*/
        required: true,
        default: []
      },
  })

  module.exports = mongoose.model('Timeline', adviceSchema) //exporting the subscriberSchema