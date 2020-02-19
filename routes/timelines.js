const express = require('express')
const router = express.Router()
const Timeline = require('../models/timeline')

//get all clinic subscribers
router.get('/', (req, res) => {
    console.log("----GETS ALL OBJCTS-----");
    try {
        Timeline.find({}).then(tl => {
          var r = res.json(tl);
          for(var i in tl) {
            console.log("title: " + tl[i].title); }
        })
        } catch (err) {
        res.status(500).json({ message: err.message })
        }
})

//create one timeline
router.post('/', (req, res) => {

    try {
        if(req.body.title) {
            console.log('there is a title!');
            const tl = new Timeline({
            title: req.body.title
            });
            var newTimeline = new Timeline({
            title: tl.title
            })
            newTimeline.save()
            res.status(201).json(newTimeline);
        }
        else { throw 'no timeline could be posted'; }
    } catch (err) { console.error(err) } 
})

module.exports = router