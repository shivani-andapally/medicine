import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Order } from '../../services/order';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders {
  purchaseHistory: any[] = [];
  currentOrder: any = null;
  error = '';
  success = '';

  constructor(private orderService: Order) {}

  ngOnInit() {
    this.loadPurchaseHistory();
  }

  loadPurchaseHistory() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.orderService.getOrders(userId).subscribe({
      next: (data: any) => {
        this.purchaseHistory = data;
        this.currentOrder = data[data.length - 1] || null; // last placed order
      },
      error: (err) => {
        console.error('Failed to fetch purchase history', err);
        this.error = 'Could not load purchase history';
      }
    });
  }
}