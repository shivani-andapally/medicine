import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Order } from '../../services/order';
import { Userservice } from '../../services/userservice';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class Details {
  medicine: any;
  quantity: number = 1;
  success = '';
  error = '';
  currentOrder: any;
  showGoToOrders: boolean = false;
  recommendations: any[] = [];  
  constructor(public router: Router, private orderService: Order,private user:Userservice) {
    const nav = this.router.getCurrentNavigation();
    this.medicine = nav?.extras?.state?.['medicine'];
  }

  ngOnInit() {
    if (this.medicine?.name) {
      this.fetchRecommendations(this.medicine.name);
    }
  }

  placeOrder() {
    const userId = localStorage.getItem('userId');
    if (!userId || !this.medicine) {
      this.error = 'User not logged in or medicine missing!';
      return;
    }

    const orderData = {
      userId,
      medicineId: this.medicine._id,
      quantity: this.quantity
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: (res: any) => {
        this.success = 'Order placed successfully!';
        this.currentOrder = {
          medicine: this.medicine,
          quantity: this.quantity,
          totalPrice: res.totalPrice || 0
        };
        this.showGoToOrders = true;
      },
      error: (err) => {
        this.error = 'Order failed: ' + (err.error?.message || 'Server error');
      }
    });
  }
  goToOrders() {
  this.router.navigate(['/app/orders']);
}
fetchRecommendations(name: string) {
  if (!name) return;  

  this.recommendations = [];  
  this.user.getRecommendations(name)  
    .subscribe({
      next: (res: any) => {
        this.recommendations = res?.recommendations || res;  
      },
      error: (err) => {
        console.error('Failed to load recommendations', err);
        this.recommendations = [];  
      }
    });
}

}
