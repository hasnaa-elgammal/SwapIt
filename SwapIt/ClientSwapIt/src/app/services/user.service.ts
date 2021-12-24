import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../categories/interfaces/product.interface';
import { ProductModel } from '../models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl= 'https://localhost:44329/User/';
  headers = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
    withCredentials: true,
  };

  GetAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl + 'GetAllProducts').pipe();
  }

  AddProduct(pro : ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.baseUrl + 'AddProduct', pro, this.headers).pipe();
  }
  
}
