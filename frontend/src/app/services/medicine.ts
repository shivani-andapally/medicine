import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Medicine {
  private apiUrl = 'http://localhost:4000/medicines'; // backend API

  constructor(private http: HttpClient) {}

  getAllMedicines(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  searchMedicines(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${query}`);
  }

  getRecommendations(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/recom/${name}`);
  }

  addMedicine(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  getInitialRecommendations(userId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/users/rec/${userId}`);
}
}
