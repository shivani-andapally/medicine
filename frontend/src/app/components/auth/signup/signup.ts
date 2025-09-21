import { Component } from '@angular/core';
import { Userservice } from '../../../services/userservice';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  name = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private userService: Userservice, private router: Router) {}

  signup() {
    this.error = '';
    this.success = '';
    this.userService.signup({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        this.success = 'Account created successfully! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.error = err.error.message || 'Signup failed';
      }
    });
  }
}
