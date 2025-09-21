import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Order {
  private baseUrl = 'http://localhost:4000/orders';

  constructor(private http: HttpClient) {}

  // Place a new order
  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, orderData);
  }

  // Get purchase history of a user
  getOrders(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }
}
