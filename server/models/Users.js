const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS

let emailLengthChecker = (email) => {
  if (!email) {
    return false; // Return error
  } else {
    if (email.length < 5 || email.length > 30) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid e-mail
    }
  }
};

let validEmailChecker = (email) => {
  if (!email) {
    return false; // Return error
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    return regExp.test(email); // Return regular expression test results (true or false)
  }
};

const emailValidators = [
  {
    validator: emailLengthChecker,
    message: 'E-mail must be at least 5 characters but no more than 30'
  },
  {
    validator: validEmailChecker,
    message: 'Must be a valid e-mail'
  }
];

let usernameLengthChecker = (username) => {
  if (!username) {
    return false; // Return error
  } else {
    if (username.length < 3 || username.length > 15) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid username
    }
  }
};

let validUsername = (username) => {
  if (!username) {
    return false; // Return error
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username); // Return regular expression test result (true or false)
  }
};

const usernameValidators = [
  {
    validator: usernameLengthChecker,
    message: 'Username must be at least 3 characters but no more than 15'
  },
  {
    validator: validUsername,
    message: 'Username must not have any special characters'
  }
];

let passwordLengthChecker = (password) => {
  if (!password) {
    return false; // Return error
  } else {
    if (password.length < 8 || password.length > 35) {
      return false;
    } else {
      return true;
    }
  }
};

let validPassword = (password) => {
  if (!password) {
    return false; // Return error
  } else {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password); // Return regular expression test result (true or false)
  }
};


const passwordValidators = [
  {
    validator: passwordLengthChecker,
    message: 'Password must be at least 8 characters but no more than 35'
  },
  {
    validator: validPassword,
    message: 'Must have at least one uppercase, lowercase, special character, and number'
  }
];

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
  username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
  password: { type: String, required: true, validate: passwordValidators }
});

// Schema Middleware to Encrypt Password
userSchema.pre('save', function (next) {
  // Ensure password is new or modified before applying encryption
  if (!this.isModified('password'))
    return next();

  // Apply encryption
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err); // Ensure no errors
    this.password = hash; // Apply encryption to password
    next(); // Exit middleware
  });
});

// Methods to compare password to encrypted password upon login
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
};

// Export Module/Schema
module.exports = mongoose.model('Users', userSchema);