import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  messageClass: string;
  message: any;
  newPost: boolean = false;
  loadingReviews: boolean = false;
  form: any;
  commentForm: any;
  processing: boolean = false;
  username: any;
  reviewPosts: any;
  newComment: Array<string> = [];
  enabledComments: any = [];
  revData: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private reviewService: ReviewService
  ) {
    this.createNewReviewForm(); // Create new blog form on start up
    this.createCommentForm(); // Create form for posting comments on a user's blog post
  }

  // Function to create new review form
  createNewReviewForm() {
    this.form = this.formBuilder.group({
      // Title field
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      // Body field
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    })
  }

  // Create form for posting comments
  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ])]
    })
  }

  // Enable the comment form
  enableCommentForm() {
    this.commentForm.get('comment').enable(); // Enable comment field
  }

  // Disable the comment form
  disableCommentForm() {
    this.commentForm.get('comment').disable(); // Disable comment field
  }

  // Enable new blog form
  enableFormNewReviewForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
  }

  // Disable new blog form
  disableFormNewReviewForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable(); // Disable body field
  }

  // Validation for title
  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'alphaNumericValidation': true } // Return error in validation
    }
  }

  // Function to display new blog form
  newReviewForm() {
    this.newPost = true; // Show new blog form
  }

  // Reload blogs on current page
  reloadReviews() {
    this.loadingReviews = true; // Used to lock button
    this.getAllReviews(); // Add any new blogs to the page
    setTimeout(() => {
      this.loadingReviews = false; // Release button lock after four seconds
    }, 4000);
  }

  // Function to post a new comment on blog post
  draftComment(id) {
    this.commentForm.reset(); // Reset the comment form each time users starts a new comment
    this.newComment = []; // Clear array so only one post can be commented on at a time
    this.newComment.push(id); // Add the post that is being commented on to the array
  }

  // Function to cancel new post transaction
  cancelSubmission(id) {
    const index = this.newComment.indexOf(id); // Check the index of the blog post in the array
    this.newComment.splice(index, 1); // Remove the id from the array to cancel post submission
    this.commentForm.reset(); // Reset  the form after cancellation
    this.enableCommentForm(); // Enable the form after cancellation
    this.processing = false; // Enable any buttons that were locked
  }

  // Function to submit a new blog post
  onReviewSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormNewReviewForm(); // Lock form

    // Create blog object from form fields
    const review = {
      title: this.form.get('title').value, // Title field
      body: this.form.get('body').value, // Body field
      createdBy: this.username // CreatedBy field
    }

    // Function to save blog into database
    this.reviewService.newReview(review).subscribe(data => {
      // Check if blog was saved to database or not
      this.revData = data;
      if (!this.revData.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = this.revData.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormNewReviewForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = this.revData.message; // Return success message
        this.getAllReviews();
        // Clear form data after two seconds
        setTimeout(() => {
          this.newPost = false; // Hide form
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.form.reset(); // Reset all form fields
          this.enableFormNewReviewForm(); // Enable the form fields
        }, 2000);
      }
    });
  }

  // Function to go back to previous page
  goBack() {
    window.location.reload(); // Clear all variable states
  }

  // Function to get all blogs from the database
  getAllReviews() {
    // Function to GET all blogs from database
    this.reviewService.getAllReviews().subscribe(data => {
      this.revData = data
      console.log(this.revData)
      this.reviewPosts = this.revData.reviews; // Assign array to use in HTML
    });
  }

  // Function to like a blog post
  likeReview(id) {
    // Service to like a blog post
    this.reviewService.likeReview(id).subscribe(data => {
      this.getAllReviews(); // Refresh blogs after like
    });
  }

  // Function to disliked a blog post
  dislikeReview(id) {
    // Service to dislike a blog post
    this.reviewService.dislikeReview(id).subscribe(data => {
      this.getAllReviews(); // Refresh blogs after dislike
    });
  }

  // Function to post a new comment
  postComment(id) {
    this.disableCommentForm(); // Disable form while saving comment to database
    this.processing = true; // Lock buttons while saving comment to database
    const comment = this.commentForm.get('comment').value; // Get the comment value to pass to service function
    // Function to save the comment to the database
    this.reviewService.postComment(id, comment).subscribe(data => {
      this.getAllReviews(); // Refresh all blogs to reflect the new comment
      const index = this.newComment.indexOf(id); // Get the index of the blog id to remove from array
      this.newComment.splice(index, 1); // Remove id from the array
      this.enableCommentForm(); // Re-enable the form
      this.commentForm.reset(); // Reset the comment form
      this.processing = false; // Unlock buttons on comment form
      if (this.enabledComments.indexOf(id) < 0) this.expand(id); // Expand comments for user on comment submission
    });
  }

  // Expand the list of comments
  expand(id) {
    this.enabledComments.push(id); // Add the current blog post id to array
  }

  // Collapse the list of comments
  collapse(id) {
    const index = this.enabledComments.indexOf(id); // Get position of id in array
    this.enabledComments.splice(index, 1); // Remove id from array
  }

  ngOnInit() {
    // Get profile username on page load
    this.authService.getProfile().subscribe(data => {
      console.log(data)
      this.revData = data;
      console.log(this.revData)
      this.username = this.revData.user.username; // Used when creating new blog posts and comments
      this.getAllReviews(); // Get all blogs on component load
    });
  }

}
