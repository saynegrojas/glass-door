const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Employee = require('../models/Employee');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = process.env.PASSWORD;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload)
    Employee.getEmpById(jwt_payload.emp._id, (err, emp) => {
      console.log(jwt_payload.emp._id, 'payload')
      if (err) {
        return done(err, false);
      }
      if (emp) {
        console.log(emp)
        return done(null, emp);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  }));
}