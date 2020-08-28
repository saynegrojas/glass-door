import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

  message: any;
  messageClass: string;
  review: any;
  processing: boolean = false;
  currentUrl: any;
  loading: boolean = true;
  revData: any = {};

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public reviewService: ReviewService,
    private router: Router
  ) { }

  updateReviewSubmit() {
    this.processing = true; // Lock form fields
    this.reviewService.editReview(this.review).subscribe(data => {
      if (!this.revData.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = this.revData.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = this.revData.message; // Set success message
        setTimeout(() => {
          this.router.navigate(['/review']); // Navigate back to route page
        }, 2000);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    this.reviewService.getSingleReview(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!this.revData.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = this.revData.message; // Set error message
      } else {
        this.review = this.revData.review; // Save review object for use in HTML
        this.loading = false; // Allow loading of review form
      }
    });

  }

}
