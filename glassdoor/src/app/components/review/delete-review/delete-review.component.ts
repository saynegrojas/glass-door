import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-review',
  templateUrl: './delete-review.component.html',
  styleUrls: ['./delete-review.component.css']
})
export class DeleteReviewComponent implements OnInit {
  message: any;
  messageClass: string;
  foundReview: boolean = false;
  processing: boolean = false;
  review: any;
  currentUrl: any;
  revData: any = {};

  constructor(
    public reviewService: ReviewService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  deleteReview() {
    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.reviewService.deleteReview(this.currentUrl.id).subscribe(data => {
      if (!this.revData.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = this.revData.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = this.revData.message; // Return success message
        setTimeout(() => {
          this.router.navigate(['/review']); // Route users to review page
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve review
    this.reviewService.getSingleReview(this.currentUrl.id).subscribe(data => {
      // Check if request was successfull
      if (!this.revData.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = this.revData.message; // Return error message
      } else {
        // Create the review object to use in HTML
        this.review = {
          title: this.revData.review.title, // Set title
          body: this.revData.review.body, // Set body
          createdBy: this.revData.review.createdBy, // Set created_by field
          createdAt: this.revData.review.createdAt // Set created_at field
        }
        this.foundReview = true; // Displaly review window
      }
    });
  }

}
