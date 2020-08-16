const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post('/register', (req, res) => {
  let newEmp = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    workEmail: req.body.workEmail,
    jobOpening: req.body.jobOpening,
    password: req.body.password,
    company: req.body.company,
    jobTitle: req.body.jobTitle

  });
  console.log(newEmp)
  // call add user function
  Employee.addEmp(newEmp, (err, emp) => {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: 'Failed to register employee' });
    } else {
      res.json({ success: true, msg: 'Registered' });
    }
  });
});

router.post('/authenticate', (req, res) => {
  const workEmail = req.body.workEmail;
  const password = req.body.password;

  Employee.getEmpByEmail(workEmail, (err, emp) => {
    if (err) throw err;
    if (!emp) {
      return res.json({ success: false, msg: 'Employee not found' })
    }
    Employee.comparePassword(password, emp.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ emp }, process.env.PASSWORD, {
          expiresIn: 86400 //1 day
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          emp: {
            id: emp._id,
            firstName: emp.firstName,
            lastName: emp.lastName,
            workEmail: emp.workEmail,
            jobOpening: emp.jobOpening,
            jobTitle: emp.jobTitle,
            company: emp.company
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  })
});

// any route to protect with token, pass passport.auth as second param
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  console.log(req.user, 'req')
  res.json({ emp: req.user })
});

router.get('/validate', (req, res) => {
  res.send('validate');
});
module.exports = router;