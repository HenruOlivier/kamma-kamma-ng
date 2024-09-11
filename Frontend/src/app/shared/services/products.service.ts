import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = 'http://localhost:5000/api/products';  // Adjust this URL if necessary

  constructor(private http: HttpClient) {}

  

  // Fetch all products from backend
  // getProducts(): Observable<any> {
  //   return this.http.get<any>(this.baseUrl);
  // }
}
