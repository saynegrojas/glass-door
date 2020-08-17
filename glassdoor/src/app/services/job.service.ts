import { Injectable } from '@angular/core';
import { IJobs } from '../../app/components/Jobs/models/jobs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private _url: string = "http://localhost:8080/api/jobs";

  constructor(private http: HttpClient) { }

  getjobs(): Observable<IJobs[]> {
    return this.http.get<IJobs[]>(this._url).pipe(catchError(this.errorHandler));
  }

  getjobsbyID(id: number): Observable<IJobs[]> {
    return this.http.get<IJobs[]>(this._url + '/' + id).pipe(catchError(this.errorHandler));
  }


  postJob(userData): Observable<IJobs[]> {
    return this.http.post<IJobs[]>(this._url, userData)
      .pipe(catchError(this.errorHandler));
  }

  updateJob(id: number, jobData): Observable<IJobs[]> {
    console.log(jobData)
    console.log(this._url + '/' + id)
    return this.http.put<IJobs[]>(this._url + '/' + id, jobData)
      .pipe(catchError(this.errorHandler));
  }

  deleteJob(id) {
    return this.http.delete(this._url + '/' + id);
  }
  errorHandler(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.message || "Server Error");
  }

}
