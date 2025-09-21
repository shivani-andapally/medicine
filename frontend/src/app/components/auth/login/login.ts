import { Component } from '@angular/core';
import { Userservice } from '../../../services/userservice';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  error = '';
  loading = false;
  constructor(private userService: Userservice, private router: Router,private auth: AuthService) {}

  login() {
    this.error = '';
    this.loading = true;

    this.userService.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        console.log('Login success:', res);
        // Save user info
        this.auth.login(res.userId); // mark logged in
        localStorage.setItem('userName', res.name);
        localStorage.setItem('userId', res.userId);
        
        this.loading = false;
        this.router.navigate(['/app']); // Redirect to home
      },
      error: (err) => {
        console.error('Login error:', err);
        this.error = err.error?.message || 'Login failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
