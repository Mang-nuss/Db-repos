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
    console.log("----GETS ALL OBJCTS-----");
    try {
        Subscriber.find({}).then(subsc => { //note: ,{name:1} to get only 'name' attr
          var r = res.json(subsc);
          for(var i in subsc) {
            console.log("name: " + subsc[i].name); }
        }) //finds the objects of the subscribers modelled. REMOVED: await
        } catch (err) {
        res.status(500).json({ message: err.message })
        }
})

//get one clinic subscriber
router.get('/:id', (req, res) => {
    try {
      //subsc = await Subscriber.findById(req.param.id); 
        Subscriber.findById(req.params.id).then(subsc => {
        const s = JSON.stringify(subsc);
        res.json(s)
        console.log("advices for user named " + subsc.name +
          " are: ");
        var arr = subsc.timeline;
        for(i in arr) { console.log(arr[i]); }
      })
      } catch (err) {
      res.status(500).json({ message: err.message })
      }
})

//create one clinic subscriber
router.post('/', (req, res) => {

    const types = ['clinic', 'restaurant'];
    try {
      types.forEach(function(item) {
        if(req.body.clinicType === item) {
          console.log('match!');
          const subscriber = new Subscriber({
            name: req.body.name,
            subscribedClinic: req.body.subscribedClinic,
            clinicType: req.body.clinicType,
            timeline: req.body.timeline
          });
          var newSub = new Subscriber({
            name: subscriber.name,
            subscribedClinic: subscriber.subscribedClinic,
            clinicType: subscriber.clinicType,
            timeline: subscriber.timeline
          })
          newSub.save() //saves the subscriber correctly 'posted'. REMOVED: await
          res.status(201).json(newSub);
          /*} catch (err) {
            res.status(400).json({ message: err.message })
          }*/
        }
        else { throw 'the type ' + req.body.clinicType + ' does not match'; }
      })
    } catch (err) { console.error(err) } 
})

router.put('/:id', (req, res) => {

    Subscriber.findOneAndUpdate({
      name: req.body.name,
      subscribedClinic: req.body.subscribedClinic,
      clinicType: req.body.clinicType,
      timeline: req.body.timeline
    }).then(Subscriber => {
      res.json(Subscriber);
    })
})

//delete one clinic subscriber
router.delete('/:id', (req, res) => {
    try {
        Subscriber.findById(req.params.id).then(subsc => {
        subsc.remove();
        console.log("subscriber named " + subsc.name + " was removed");
        res.json({ message: 'Deleted This Subscriber' })
      })
      } catch (err) {
      res.status(500).json({ message: err.message })
      }
})

//Helper method of optional use
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

    /*
    if(typeMatches(req)) {
      const subscriber = new Subscriber({
        name: req.body.name,
        subscribedClinic: req.body.subscribedClinic,
        clinicType: req.body.clinicType
      });
    }
    else { throw 'does not match!'; }
    
    try {
        var newSub = new Subscriber({
          name: subscriber.name,
          subscribedClinic: subscriber.subscribedClinic,
          clinicType: subscriber.clinicType
        })
        newSub.save() //saves the subscriber correctly 'posted'. REMOVED: await
        res.status(201).json(newSub)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
      */

//update one clinic subscriber. Replaces the PUT method
/*router.patch('/:id', (req, res) => {
    if (req.body.name != null) {
        const n = req.body.name
        res.subscriber.name = n
    }
    
    if (req.body.subscribedClinic != null) {
        res.subscriber.subscribedClinic = req.body.subscribedClinic
    }

    try {
      console.log("patch!");
        const updatedSubscriber = res.subscriber.save() //REMOVED: await
        res.json(updatedSubscriber)
      } catch {
        res.status(400).json({ message: err.message })
      }
})*/
