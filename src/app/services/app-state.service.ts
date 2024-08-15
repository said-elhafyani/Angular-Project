import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productsState :any ={
    products : [] ,
    keyword : "",
    totalPages:0,
    pageSize: 3,
    cuurentPage: 1,
    totalProducts:0,
    status : "",
    errorMessage :""
  }

  public authState :any ={
    isAuthenticated: false,
    username : undefined,
    roles : undefined,
    token : undefined
  }

  constructor() {}

  public setProductState(state :any) :void{
    this.productsState = {...this.productsState,...state};
  }

  public setAuthState(state :any) :void{
    this.authState = {...this.authState,...state};
  }
}
