const mongoose = require('mongoose');
const JobsSchema = new mongoose.Schema({
  //_id: Number,
  Job_Title: String,
  Job_Location: String,
  Job_Description: String,
  Salary: Number,
  Company_Name: String,
  Job_Type: String,
  Poste_Date:
    { type: Date, default: Date.now() },
  App_Deadeline: Date
  // likes
})

module.exports = mongoose.model('Jobs', JobsSchema)