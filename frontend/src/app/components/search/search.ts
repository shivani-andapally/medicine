import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../services/medicine';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search implements OnInit {
  query: string = '';
  medicines: any[] = [];
  recommendations: any[] = [];
  loading = false;
  userId: string | null = null;

  constructor(private medicine: Medicine, private router: Router) {}
  ngOnInit() {
  // Get userId from localStorage
  this.userId = localStorage.getItem('userId');

  if (this.userId) {
    this.loadInitialRecommendations();
  } else {
    console.warn('User not logged in: cannot load recommendations');
    this.recommendations = []; // optionally clear recommendations
  }
}

loadInitialRecommendations() {
  if (!this.userId) return; // prevent calling backend without userId

  this.loading = true;
  this.medicine.getInitialRecommendations(this.userId).subscribe({
    next: (data) => {
      this.recommendations = data;
      this.loading = false;
    },
    error: (err) => {
      console.error('Initial recommendations error', err);
      this.loading = false;
    }
  });
}


  search() {
    if (!this.query.trim()) {
      this.medicines = [];
      this.loadInitialRecommendations(); // show initial recommendations when input empty
      return;
    }

    this.loading = true;
    this.medicine.searchMedicines(this.query).subscribe({
      next: (data) => {
        this.medicines = data;
        this.recommendations = [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Search error', err);
        this.loading = false;
      }
    });
  }

  buyNow(medicine: any) {
    if (!medicine) return;
    console.log('Buying medicine:', medicine);
    this.router.navigate(['/app/details'], { state: { medicine } });
  }

  getRecommendations(medName: string) {
    this.loading = true;
    this.medicine.getRecommendations(medName).subscribe({
      next: (data: any) => {
        this.recommendations = data.recommendations;
        this.loading = false;
      },
      error: (err) => {
        console.error('Recommendation error', err);
        this.loading = false;
      }
    });
  }
}
