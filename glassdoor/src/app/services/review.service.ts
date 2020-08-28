import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ReviewService {

  options: any;
  private url: string = this.authService.url;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    // this.options = new RequestOptions({
    //   headers: new Headers({
    //     'Content-Type': 'application/json', // Format set to JSON
    //     'authorization': this.authService.authToken // Attach token
    //   })
    // });
    this.options = new HttpHeaders({ 'Authorization': this.authService.authToken, 'Content-Type': 'application/json' });
    // headers.append('authorization': this.authToken 'Content-Type', 'application/json')
    return this.options;
  }

  // Function to create a new blog post
  newReview(review) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.url + 'reviews/newReview', review, this.options).pipe(map(res => JSON.stringify(res)));
  }

  // Function to get all blogs from the database
  getAllReviews() {
    // this.createAuthenticationHeaders(); // Create headers
    this.authService.loadToken();
    this.options = new HttpHeaders({ 'Authorization': this.authService.authToken, 'Content-Type': 'application/json' });
    return this.http.get(this.url + 'reviews/allReviews', this.options).pipe(map(res => JSON.stringify(res)));
  }

  // Function to get the blog using the id
  getSingleReview(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.url + 'reviews/singleReview/' + id, this.options).pipe(map(res => JSON.stringify(res)));
  }

  // Function to edit/update blog post
  editReview(review) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.url + 'reviews/updateReview/', review, this.options).pipe(map(res => JSON.stringify(res)));
  }

  // Function to delete a blog
  deleteReview(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.url + 'reviews/deleteReview/' + id, this.options).pipe(map(res => JSON.stringify(res)));
  }

  // Function to like a blog post
  likeReview(id) {
    const reviewData = { id: id };
    return this.http.put(this.url + 'reviews/likeReview/', reviewData, this.options).pipe(map(res => JSON.stringify(res)));
  }

  // Function to dislike a blog post
  dislikeReview(id) {
    const reviewData = { id: id };
    return this.http.put(this.url + 'reviews/dislikeReview/', reviewData, this.options).pipe(map(res => JSON.stringify(res)));
  }

  postComment(id, comment) {
    this.createAuthenticationHeaders(); // Create headers
    const reviewData = {
      id: id,
      comment: comment
    }
    return this.http.post(this.url + 'reviews/comment', reviewData, this.options).pipe(map(res => JSON.stringify(res)));

  }

}
