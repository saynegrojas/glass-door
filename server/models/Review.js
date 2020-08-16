const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

let titleLengthChecker = (title) => {
  if (!title) {
    return false; // Return error
  } else {

    if (title.length < 5 || title.length > 50) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid title
    }
  }
};


let alphaNumericTitleChecker = (title) => {

  if (!title) {
    return false;
  } else {

    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(title);
  }
};

// Array of Title Validators
const titleValidators = [

  {
    validator: titleLengthChecker,
    message: 'Title must be more than 5 characters but no more than 50'
  },
  {
    validator: alphaNumericTitleChecker,
    message: 'Title must be alphanumeric'
  }
];

let bodyLengthChecker = (body) => {

  if (!body) {
    return false;
  } else {

    if (body.length < 5 || body.length > 500) {
      return false;
    } else {
      return true;
    }
  }
};


const bodyValidators = [

  {
    validator: bodyLengthChecker,
    message: 'Body must be more than 5 characters but no more than 500.'
  }
];

let commentLengthChecker = (comment) => {

  if (!comment[0]) {
    return false;
  } else {

    if (comment[0].length < 1 || comment[0].length > 200) {
      return false;
    } else {
      return true;
    }
  }
};


const commentValidators = [
  {
    validator: commentLengthChecker,
    message: 'Comments may not exceed 200 characters.'
  }
];

const reviewSchema = new Schema({
  title: { type: String, required: true, validate: titleValidators },
  body: { type: String, required: true, validate: bodyValidators },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  likedBy: { type: Array },
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: Array },
  comments: [{
    comment: { type: String, validate: commentValidators },
    commentator: { type: String }
  }]
});

// Export Module/Schema
module.exports = mongoose.model('Review', reviewSchema);
