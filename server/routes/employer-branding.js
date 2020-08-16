const express = require('express');
const router = express.Router();
const EmployerBranding = require('../models/Employer_branding');

//get all
router.get('/employer_branding', async (req, res) => {
  try {
    const employerBranding = await EmployerBranding.find();
    res.json(employerBranding);
  } catch (err) {
    res.json({ msg: err });
  }
});

//get one by id
router.get('/employer_branding/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const employerBranding = await EmployerBranding.findById(req.params.id);
    res.json(employerBranding);
  } catch (err) {
    res.json({ msg: err });
  }
});


// post
router.post('/employer_branding', async (req, res) => {

  const employerBranding = new EmployerBranding({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    company: req.body.company,
    jobTitle: req.body.jobTitle,
    workEmail: req.body.workEmail,
    phoneNumber: req.body.phoneNumber,
    jobOpening: req.body.jobOpening,
    country: req.body.country,
    comments: req.body.comments
  });
  try {
    const savedEmpBranding = await employerBranding.save();
    res.json(savedEmpBranding);
  } catch (err) {
    console.log(err)
    res.json({ msg: err });
  }
});

//update
router.put('/employer_branding/:id', async (req, res) => {
  try {
    const updaetedEmpBranding = await EmployerBranding.updateOne({ _id: req.params.id }, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        company: req.body.company,
        jobTitle: req.body.jobTitle,
        workEmail: req.body.workEmail,
        phoneNumber: req.body.phoneNumber,
        jobOpening: req.body.jobOpening,
        country: req.body.country,
        comments: req.body.comments
      }
    });
    res.json(updaetedEmpBranding);
  } catch (err) {
    console.log(err)
    res.json({ msg: err });
  }
});

//delete by id
router.delete('/employer_branding/:id', async (req, res) => {
  try {
    const removedEmpBranding = await EmployerBranding.deleteOne({ _id: req.params.id });
    res.json(removedEmpBranding);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;