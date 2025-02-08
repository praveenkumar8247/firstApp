import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http
      .get<Event[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getEvent(id: string): Observable<Event> {
    if (!id) return throwError(() => new Error('Invalid event ID'));
    return this.http
      .get<Event>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createEvent(event: Event): Observable<Event> {
    return this.http
      .post<Event>(this.apiUrl, event)
      .pipe(catchError(this.handleError));
  }
  updateEvent(id: string, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<{}> {
    if (!id)
      return throwError(() => new Error('Invalid event ID for deletion'));
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error:', error);
    let errorMessage = error.error?.message || 'An unknown error occurred';
    return throwError(() => new Error(errorMessage));
  }
}
