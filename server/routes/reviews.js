const Users = require('../models/Users');
const Review = require('../models/Review');
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database');

module.exports = router => {


  router.post('/newReview', (req, res) => {

    if (!req.body.title) {
      res.json({ success: false, message: 'Review title is required.' }); // Return error message
    } else {

      if (!req.body.body) {
        res.json({ success: false, message: 'Review body is required.' }); // Return error message
      } else {

        if (!req.body.createdBy) {
          res.json({ success: false, message: 'Review creator is required.' }); // Return error
        } else {

          const review = new Review({
            title: req.body.title, // Title field
            body: req.body.body, // Body field
            createdBy: req.body.createdBy // CreatedBy field
          });

          review.save((err) => {
            if (err) {
              if (err.errors) {
                if (err.errors.title) {
                  res.json({ success: false, message: err.errors.title.message }); // Return error message
                } else {
                  if (err.errors.body) {
                    res.json({ success: false, message: err.errors.body.message }); // Return error message
                  } else {
                    res.json({ success: false, message: err }); // Return general error message
                  }
                }
              } else {
                res.json({ success: false, message: err }); // Return general error message
              }
            } else {
              res.json({ success: true, message: 'Review saved!' }); // Return success message
            }
          });
        }
      }
    }
  });


  router.get('/allReviews', (req, res) => {

    Review.find({}, (err, reviews) => {

      if (err) {
        res.json({ success: false, message: err });
      } else {

        if (!reviews) {
          res.json({ success: false, message: 'No reviews found.' });
        } else {
          res.json({ success: true, reviews: reviews });
        }
      }
    }).sort({ '_id': -1 });
  });


  //GET SINGLE REVIEW

  router.get('/singleReview/:id', (req, res) => {
    // Check if id is present in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No review ID was provided.' }); // Return error message
    } else {
      Review.findOne({ _id: req.params.id }, (err, review) => {
        if (err) {
          res.json({ success: false, message: 'Not a valid review id' }); // Return error message
        } else {
          if (!review) {
            res.json({ success: false, message: 'Review not found.' }); // Return error message
          } else {
            Users.findOne({ _id: req.decoded.userId }, (err, user) => {
              if (err) {
                res.json({ success: false, message: err }); // Return error
              } else {
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
                } else {
                  if (user.username !== review.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to edit this review.' }); // Return authentication reror
                  } else {
                    res.json({ success: true, review: review }); // Return success
                  }
                }
              }
            });
          }
        }
      });
    }
  });


  //     UPDATE Review POST

  router.put('/updateReview', (req, res) => {
    if (!req.body._id) {
      res.json({ success: false, message: 'No review id provided' }); // Return error message
    } else {
      Review.findOne({ _id: req.body._id }, (err, review) => {
        if (err) {
          res.json({ success: false, message: 'Not a valid review id' }); // Return error message
        } else {
          if (!review) {
            res.json({ success: false, message: 'Review id was not found.' }); // Return error message
          } else {
            Users.findOne({ _id: req.decoded.userId }, (err, user) => {
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  if (user.username !== review.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to edit this review post.' }); // Return error message
                  } else {
                    review.title = req.body.title; // Save latest review title
                    review.body = req.body.body; // Save latest body
                    review.save((err) => {
                      if (err) {
                        if (err.errors) {
                          res.json({ success: false, message: 'Please ensure form is filled out properly' });
                        } else {
                          res.json({ success: false, message: err }); // Return error message
                        }
                      } else {
                        res.json({ success: true, message: 'Review Updated!' }); // Return success message
                      }
                    });
                  }
                }
              }
            });
          }
        }
      });
    }
  });

  //     DELETE review POST

  router.delete('/deleteReview/:id', (req, res) => {
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {
      Review.findOne({ _id: req.params.id }, (err, review) => {
        if (err) {
          res.json({ success: false, message: 'Invalid id' }); // Return error message
        } else {
          if (!review) {
            res.json({ success: false, messasge: 'Review was not found' }); // Return error message
          } else {
            Users.findOne({ _id: req.decoded.userId }, (err, user) => {
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  if (user.username !== review.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to delete this review post' }); // Return error message
                  } else {
                    review.remove((err) => {
                      if (err) {
                        res.json({ success: false, message: err }); // Return error message
                      } else {
                        res.json({ success: true, message: 'Review deleted!' }); // Return success message
                      }
                    });
                  }
                }
              }
            });
          }
        }
      });
    }
  });

  //     LIKE Review POST

  router.put('/likeReview', (req, res) => {
    if (!req.body.id) {
      res.json({ success: false, message: 'No id was provided.' }); // Return error message
    } else {
      Review.findOne({ _id: req.body.id }, (err, review) => {
        if (err) {
          res.json({ success: false, message: 'Invalid review id' }); // Return error message
        } else {
          if (!review) {
            res.json({ success: false, message: 'That review was not found.' }); // Return error message
          } else {
            Users.findOne({ _id: req.decoded.userId }, (err, user) => {
              if (err) {
                res.json({ success: false, message: 'Something went wrong.' }); // Return error message
              } else {
                if (!user) {
                  res.json({ success: false, message: 'Could not authenticate user.' }); // Return error message
                } else {
                  if (user.username === review.createdBy) {
                    res.json({ success: false, messagse: 'Cannot like your own post.' }); // Return error message
                  } else {
                    if (review.likedBy.includes(user.username)) {
                      res.json({ success: false, message: 'You already liked this post.' }); // Return error message
                    } else {
                      if (review.dislikedBy.includes(user.username)) {
                        review.dislikes--; // Reduce the total number of dislikes
                        const arrayIndex = review.dislikedBy.indexOf(user.username); // Get the index of the username in the array for removal
                        review.dislikedBy.splice(arrayIndex, 1); // Remove user
                        review.likes++;
                        review.likedBy.push(user.username);
                        review.save((err) => {
                          // Check if error was found
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'Review liked!' }); // Return success message
                          }
                        });
                      }
                      else {
                        review.likes++; // Increment likes
                        review.likedBy.push(user.username); // Add liker's username into array of likedBy
                        review.save((err) => {
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong in likes.' }); // Return error message
                          } else {
                            // review.likedBy.push(user.username);
                            res.json({ success: true, message: 'Review liked!' }); // Return success message
                          }
                        });
                      }
                    }
                  }
                }
              }
            });
          }
        }
      });
    }
  });

  //DISLIKE review POST
  router.put('/dislikeReview', (req, res) => {
    if (!req.body.id) {
      res.json({ success: false, message: 'No id was provided.' }); // Return error message
    } else {
      Review.findOne({ _id: req.body.id }, (err, review) => {
        if (err) {
          res.json({ success: false, message: 'Invalid review id' }); // Return error message
        } else {
          if (!review) {
            res.json({ success: false, message: 'That review was not found.' }); // Return error message
          } else {
            Users.findOne({ _id: req.decoded.userId }, (err, user) => {
              if (err) {
                res.json({ success: false, message: 'Something went wrong.' }); // Return error message
              } else {
                if (!user) {
                  res.json({ success: false, message: 'Could not authenticate user.' }); // Return error message
                } else {
                  if (user.username === review.createdBy) {
                    res.json({ success: false, messagse: 'Cannot dislike your own post.' }); // Return error message
                  } else {

                    if (review.dislikedBy.includes(user.username)) {
                      res.json({ success: false, message: 'You already disliked this post.' });
                    } else {

                      if (review.likedBy.includes(user.username)) {
                        review.likes--;
                        const arrayIndex = review.likedBy.indexOf(user.username);
                        review.likedBy.splice(arrayIndex, 1);
                        review.dislikes++;
                        review.dislikedBy.push(user.username);

                        review.save((err) => {

                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'review disliked!' }); // Return success message
                          }
                        });
                      } else {
                        review.dislikes++;
                        review.dislikedBy.push(user.username);

                        review.save((err) => {
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'review disliked!' });
                          }
                        });
                      }
                    }
                  }
                }
              }
            });
          }
        }
      });
    }
  });


  // COMMENT ON review POST

  router.post('/comment', (req, res) => {
    console.log(res)

    if (!req.body.comment) {
      res.json({ success: false, message: 'No comment provided' }); // Return error message
    } else {

      if (!req.body.id) {
        res.json({ success: false, message: 'No id was provided' }); // Return error message
      } else {

        Review.findOne({ _id: req.body.id }, (err, review) => {

          if (err) {
            res.json({ success: false, message: 'Invalid review id' }); // Return error message
          } else {

            if (!review) {
              res.json({ success: false, message: 'Review not found.' });
            } else {

              Users.findOne({ _id: req.decoded.userId }, (err, user) => {

                if (err) {
                  res.json({ success: false, message: 'Something went wrong' }); // Return error message
                } else {

                  if (!user) {
                    res.json({ success: false, message: 'User not found.' }); // Return error message
                  } else {

                    review.comments.push({
                      comment: req.body.comment,
                      commentator: user.username
                    });

                    review.save((err) => {

                      if (err) {
                        res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                      } else {
                        res.json({ success: true, message: 'Comment saved' }); // Return success message
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    }
  });

  return router;
};

