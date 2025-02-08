import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Invalid credentials';
      return;
    }

    const user = { username: this.username, password: this.password };
    console.log('Logging in user:', user);

    this.authService.login(user).subscribe((success) => {
      if (success) {
        console.log('Login successful!');
        this.router.navigate(['/events']);
      } else {
        this.errorMessage = 'Invalid credentials';
        console.error('Login failed!');
      }
    });
  }
}
