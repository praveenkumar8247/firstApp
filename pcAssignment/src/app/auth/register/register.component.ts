import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    const user = { username: this.username, password: this.password };
    console.log('Registering user:', user);

    this.authService.register(user).subscribe((response) => {
      if (response && !response.error) {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'user already exist.';
      }
    });
  }
}
