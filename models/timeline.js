const mongoose = require('mongoose')

//the 'model' of the clinic subscriber
const timelineSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    }
  })

  module.exports = mongoose.model('Timeline', timelineSchema) //exporting the subscriberSchema