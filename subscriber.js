const mongoose = require('mongoose')

//the 'model' of the clinic subscriber
const subscriberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    subscribedClinic: {
      type: String,
      required: true
    },
    subscribeDate: {
      type: Date,
      required: true,
      default: Date.now
    }
  })

  module.exports = mongoose.model('Subscriber', subscriberSchema) //exporting the subscriberSchema