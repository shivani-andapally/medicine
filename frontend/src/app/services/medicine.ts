import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Medicine {
  private apiUrl = 'http://localhost:4000/medicines'; 

  constructor(private http: HttpClient) {}

  getAllMedicines(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  searchMedicines(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${query}`);
  }

  addMedicine(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  
}
