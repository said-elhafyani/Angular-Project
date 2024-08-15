 import { Injectable } from '@angular/core';
 import { HttpClient, HttpResponse } from '@angular/common/http';
 import { Observable } from 'rxjs';
 import { Product } from '../model/product.model';

 @Injectable({
   providedIn: 'root'
 })
 export class ProductService {
   private apiUrl = 'http://localhost:8089/products';

   constructor(private http: HttpClient) {}

   getProducts(keyword:string="",page: number, size: number){
     const params = `_page=${page}&_limit=${size}`;
     return this.http.get<Product[]>(`${this.apiUrl}?name_like=${keyword}&${params}`, { observe: 'response' });
   }

   checkProduct(product: Product): Observable<Product> {
     return this.http.patch<Product>(`${this.apiUrl}/${product.id}`, { checked: !product.checked });
   }

   deleteProduct(product: Product): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}/${product.id}`);
   }

   saveProduct(product: Product): Observable<Product> {
     return this.http.post<Product>(this.apiUrl, product);
   }


   getProductById(productId: number):Observable<Product> {
     return this.http.get<Product>(`${this.apiUrl}/${productId}`);
   }

   updateProduct(product: Product):Observable<Product> {
     return this.http.put<Product>(`${this.apiUrl}/${product.id}`,product);
   }
 }
