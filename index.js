const express = require('express')
const cors = require('cors')
const logger = require('morgan');
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')

// init env file
dotenv.config()

//  app init
const app = express()

// allow all cors request
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

if (process.env.environment !== 'production') {
    app.use(logger('dev'));
}

// load view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// parse incoming body request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// set public folder
app.use(express.static(path.join(__dirname, 'public')))

const examRoute = require('./routes/exam/ExamRoute')

// import public routes
const publicRoute = require('./routes/public/publicRoute')

// route middlewares for users & doctors
app.use('/api/exam', examRoute)

// public access route
app.use('/', publicRoute)

// start server
app.listen(process.env.APP_PORT, () => {
    console.log(`Server start on port ${process.env.APP_PORT}...`)
})