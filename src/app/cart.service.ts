import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart : Array<any>=[];

  constructor() {


  }

  currentCart() {
    return this.cart;
  }
  
  purchaseCart( customCart : Array<any>) {
    this.cart = customCart;
    console.log( this.cart );
  }
  
}
