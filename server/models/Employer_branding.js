const mongoose = require('mongoose');

const EmployerBrandingSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2
  },
  company: {
    type: String,
    required: true,
    minlength: 2
  },
  jobTitle: {
    type: String,
    required: true,
    minlength: 2
  },
  workEmail: {
    type: String,
    required: true,
    minlength: 2,
    unique: true
  },
  phoneNumber: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    default: 0000000000
  },
  // maybe auto populate?
  jobOpening: {
    type: String,
    required: true,
    minlength: 1
  },
  country: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    maxlength: 50
  }
});

module.exports = mongoose.model('Employer_branding', EmployerBrandingSchema);