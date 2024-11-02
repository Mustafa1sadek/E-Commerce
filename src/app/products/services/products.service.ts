import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  baseApi:string = "https://fakestoreapi.com/";

  constructor( private _HttpClient:HttpClient) { }

  getAllProducts():Observable<any>{
    return this._HttpClient.get(this.baseApi+'products')
  }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(this.baseApi+'products/categories')
  }

  getProductsByCategory(keyword:string):Observable<any>{
    return this._HttpClient.get(this.baseApi+`products/category/${keyword}`)
  }

  getProductById(id:any):Observable<any>{
    return this._HttpClient.get(this.baseApi+`products/${id}`)
  }


}
