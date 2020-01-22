const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//const express = require('express') //requiring the packages we are using
//const app = express()
//const mongoose = require('mongoose')

//var npdb = mongoose.createConnection('mongodb://localhost/subscribers')
//npdb.on('error', (error) => console.error(error))
//npdb.once('open', () => console.log('connected to database'))

//get all clinic subscribers
router.get('/', (req, res) => {
    //res.send("Get method called")
    /*try {
        const subscribers = npdb.Subscriber.find( function (err) {
          if (err) {
            res.status(500).json({ message: err.message })
          }
          //finds the objects of the subscribers modelled. REMOVED: await
          else {
            res.json(subscribers) //returns the subscribers data
          }*/
    try {
        Subscriber.find({}).then(subscribers => {
          res.json(subscribers)
        }) //finds the objects of the subscribers modelled. REMOVED: await
        } catch (err) {
        res.status(500).json({ message: err.message })
        }
})

//get one clinic subscriber
router.get('/:id', (req, res) => {
    res.json(res.subscriber) //from the async function below
})

//create one clinic subscriber
router.post('/', (req, res) => {
    //res.send("Post method invoked")
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedClinic: req.body.subscribedClinic
        //no subscribeDate is needed because of the default function
      })
    
    try {
        var newSub = new Subscriber({
          name: subscriber.name,
          subscribedClinic: subscriber.subscribedClinic
        })
        newSub.save() //saves the subscriber correctly 'posted'. REMOVED: await
        res.status(201).json(newSub)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})

//update one clinic subscriber. Replaces the PUT method
router.patch('/:id', (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    
    if (req.body.subscribedClinic != null) {
        res.subscriber.subscribedClinic = req.body.subscribedClinic
    }

    try {
        const updatedSubscriber = res.subscriber.save() //REMOVED: await
        res.json(updatedSubscriber)
      } catch {
        res.status(400).json({ message: err.message })
      }
})

//delete one clinic subscriber
router.delete('/:id', (req, res) => {
    try {
        res.subscriber.remove() //REMOVED: await
        res.json({ message: 'Deleted This Subscriber' })
      } catch(err) {
        res.status(500).json({ message: err.message })
      }
})

//async
async function getSubscriber(req, res, next) {
  try {
      subscriber = await Subscriber.findById(req.params.id)
      //One sole if statement; there may be additionals
      if (subscriber == null) {
        return res.status(404).json({ message: 'Cant find subscriber'})
      }
    } catch(err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.subscriber = subscriber
    next() //tells the function execution to move on to the next section
  }

module.exports = router //export function