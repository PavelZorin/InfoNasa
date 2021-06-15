const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const hbs = require('hbs')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const dbConnect = require('./config/dbConnect')
const {dbConnectionURL} = require('./config/dbConfig')
const User = require('./models/users.models')
const morgan = require('morgan')
const checkAuth = require('./middleware/checkAuth')
require('dotenv').config();

const naturalEventsRouter = require('./routes/naturalEvents')
const spacePictureRouter = require('./routes/spacePicture')
const MarsPhotoByRoverRouter = require('./routes/rover')
const oneDayEarthRouter = require('./routes/oneDayEarth')
const mainRouter = require('./routes/main')
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const registrationRouter = require('./routes/registration')
const logoutRouter = require('./routes/logout')

console.log(process.env, 'server')

const app = express()
const PORT = 3000

const secretKey = '7a6b7dfcf30447f16b795eb59bd3db2f1c313e5d9d96ebfe009160d79106a0d87d7e8661c9cd8fa239b12ded634a81a7f73f1d637f6d3963ddfe95630c07fe84'
dbConnect()

app.set('view engine', 'hbs')
app.set('views', path.join(process.env.PWD, 'views'))
hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'))

hbs.registerHelper("when", (operand1,operator, operand2, options) => {
  const operators = {
    'eq' : function(l, r) {return l.toString() == r.toString()},
  }
  const result = operators[operator] (operand1,operand2)
  console.log(result);

  if(result) return options.fn(this)
  else return options.inverse(this)
})


app.use(session({
  key: 'sid_name',
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbConnectionURL
  }),
  cookie: {
    secure: false, 
    httpOnly: true,
    maxAge: 86400 * 1e3
  },
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cors())


app.use(async (req, res, next) => {
  const userId = req.session?.user?.id
  if(userId) {
    const currentUser = await User.findById(userId)
    // console.log('currentUser on middle', currentUser)
    if(currentUser) {
      res.locals.id = currentUser._id
      res.locals.name = currentUser.name
      res.locals.email = currentUser.email
    }
    console.log('res.locals.name', res.locals.name)
    console.log('res.locals.email', res.locals.email)
  }
  next()
})

app.use('/naturalEvents', naturalEventsRouter)
app.use('/spacePicture', spacePictureRouter)
app.use('/MarsPhotoByRover', MarsPhotoByRoverRouter)
app.use('/oneDayEarth',oneDayEarthRouter)
app.use('/logout', logoutRouter);
app.use('/login', loginRouter);
app.use('/registration', registrationRouter);
app.use('/main', mainRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT, () => {
  console.log('Server started on port', PORT)
})

module.exports = app;