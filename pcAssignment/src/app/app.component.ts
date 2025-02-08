import { Component, OnInit } from '@angular/core';
import { EventService, Event } from './event/event.service';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pcAssignment';
  events: Event[] = [];
  isAuthenticated = false;
  showLogin = true;

  constructor(
    private eventService: EventService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
      if (authStatus) {
        this.loadEvents();
      }
    });
  }

  loadEvents() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  viewEvent(id?: string) {
    if (id) this.router.navigate(['/event', id]);
  }

  createEvent() {
    this.router.navigate(['/create']);
  }
  register() {
    this.router.navigate(['/register']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
