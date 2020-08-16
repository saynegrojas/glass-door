const express = require('express');
const router = express.Router();
const Jobs = require('../models/Jobs');

//READ ALL
router.get("/jobs", (req, res, next) => {
  Jobs.find(function (err, data) {
    if (err) return next(err);
    res.json(data)
  })
  //res.json(data)
})

//READ ONE
router.get("/jobs/:id", (req, res, next) => {
  let id = req.params.id;
  Jobs.findById(id, function (err, object) {
    if (err) return next(err);
    res.json(object)
  })
})

//DELETE ONE
router.delete("/jobs/:id", (req, res, next) => {
  let id = req.params.id;
  Employee.findByIdAndRemove(id, function (err, object) {
    if (err) return next(err);
    res.json(object)
  })
})

//CREATE ONE
router.post("/jobs", (req, res, next) => {
  let created_object;
  if (req.body !== undefined) {
    created_object = req.body;
    Jobs.create(created_object, function (err, object) {
      if (err) return next(err);
      res.json(object)
    })
  }
})

//UPDATE ONE
router.put("/jobs/:id", (req, res, next) => {
  let id = req.params.id;
  let updated_object = req.body;
  Jobs.findByIdAndUpdate(id, updated_object, { new: true }, function (err, object) {
    if (err) return next(err);
    res.json(object)
  })
})

module.exports = router;