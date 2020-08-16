const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

// user schema
const EmployeeSchema = mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  jobOpening: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  workEmail: {
    type: String,
    required: true
  }

});

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema);

// get user by id
module.exports.getEmpById = (id, callback) => {
  Employee.findById(id, callback);
}
// get user by work email
module.exports.getEmpByEmail = (workEmail, callback) => {
  const query = { workEmail: workEmail }
  Employee.findOne(query, callback);
}

module.exports.addEmp = (newEmp, callback) => {
  //hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newEmp.password, salt, (err, hash) => {
      if (err) throw err;
      newEmp.password = hash;
      newEmp.save(callback);
    })
  })
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  })
}