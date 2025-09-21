import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  isLoggedIn = false;
  constructor(public auth: AuthService) {
    this.auth.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
  }
}
