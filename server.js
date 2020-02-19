//require('dotenv').config() //To reference variables of the npenv file
const express = require('express') //requiring the packages we are using
const app = express()
const mongoose = require('mongoose')
const mongoosa = require('mongoose'); //Another mongoose instance

/*Clinic-db*/
mongoose.set('useNewUrlParser', true); //https://mongoosejs.com/docs/deprecations.html
mongoose.set('useUnifiedTopology', true) //sets these parameters globally
mongoose.connect('mongodb://localhost/subscribers') //connects us to the database by using mongoose
var npdb = mongoose.createConnection('mongodb://localhost/subscribers')
npdb.on('error', (error) => console.error(error))
npdb.once('open', () => console.log('connected to database'))

/*Timeline-db*/
mongoosa.set('useNewUrlParser', true); //https://mongoosejs.com/docs/deprecations.html
mongoosa.set('useUnifiedTopology', true) //sets these parameters globally
mongoosa.connect('mongodb://localhost/timelines') //NEW CONNECTION
var nptls = mongoosa.createConnection('mongodb://localhost/timelines') //NEW DATABASE
nptls.on('error', (error) => console.error(error))
nptls.once('open', () => console.log('connected to database'))

app.use(express.json()) //telling the express to accept .json as data format

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)
const timelinesRouter = require('./routes/timelines')
app.use('/timelines', timelinesRouter)

//takeoff
app.listen(3005, () => console.log('server started'))