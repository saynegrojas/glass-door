//packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const router = express.Router();

// route folders
const jobsRoute = require('./routes/jobs');
const employerRoute = require('./routes/employer-branding');
const employeeRoutes = require('./routes/employee');
const authentication = require('./routes/authentication')(router);
const reviews = require('./routes/reviews')(router);

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


//routes
app.use('/employers', employerRoute);
app.use('/employee', employeeRoutes);
app.use('/api', jobsRoute)
app.use('/authentication', authentication); // Authentication routes in application
app.use('/reviews', reviews); // Review routes in application

//connect to mongodb
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () => {
  console.log('connected to server');
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Listening on port: ${PORT}`) });
