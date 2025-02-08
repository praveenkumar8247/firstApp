import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

interface User {
  id?: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private authState = new BehaviorSubject<boolean>(this.isLoggedIn());

  isAuthenticated$ = this.authState.asObservable();

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.checkUserExists(user.username).pipe(
      switchMap((exists) => {
        if (exists) {
          return of({ error: 'Username already exists' });
        }
        return this.http.post<User>(this.apiUrl, user).pipe(
          tap(() => console.log('User registered:', user)),
          catchError((error) => {
            console.error('Registration failed:', error);
            return of({ error: 'Registration failed' });
          })
        );
      })
    );
  }

  private checkUserExists(username: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}`).pipe(
      map((users) => users.length > 0),
      catchError(() => of(false))
    );
  }

  login(user: User): Observable<boolean> {
    return this.http
      .get<User[]>(`${this.apiUrl}?username=${user.username}`)
      .pipe(
        map((users) => {
          if (users.length > 0 && users[0].password === user.password) {
            localStorage.setItem('authToken', 'userLoggedIn');
            this.authState.next(true);
            console.log('Login successful for:', user.username);
            return true;
          }
          console.warn('Login failed: Invalid username or password');
          return false;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authState.next(false);
    console.log('User logged out');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
