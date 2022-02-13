import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {
  url="http://localhost:3000"
  constructor(private http:HttpClient) { }

  getAllProduct():Observable<any>{
    return this.http.get(this.url+'/all-product')
  }
  getAllCartProduct():Observable<any>{
    return this.http.get(this.url+'/all-product-cart')
  }
  editProduct(body:any):Observable<any>{
    return this.http.put(this.url+'/edit-product',body,{responseType: 'text'})
  }
  addToCart(body:any):Observable<any>{
    return this.http.post(this.url+'/add-cart',body)
  }
  removeProduct(name:string):Observable<any>{
    return this.http.delete(this.url+'/remove-from-cart/'+ name,{responseType: 'text'})
  }
  orderProduct(body:any):Observable<any>{
    return this.http.put(this.url+'/order',body,{responseType: 'text'})
  }
  downloadFile(): any {
		return this.http.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/dummy584713a.pdf', {responseType: 'blob'});
  }
}
