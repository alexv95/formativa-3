import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CartService } from "../cart.service";
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css']
})
export class CartlistComponent implements OnInit {
  
  userCart;
  totalPurchase: number;
  
  checkoutForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    lastname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    address:new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    country: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    city: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    postalCode: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(6)]),
    cardName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    creditCardNumber: new FormControl("", [Validators.required, Validators.minLength(19), Validators.maxLength(19)]),
    expiresIn: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(2),Validators.min(1),Validators.max(12)]),
    year:new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(4),Validators.min(2021)]),
    CVV: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
  });
  /*  name,lastname,email,address,country,city,postalCode,cardName,creditCardNumber,expiresIn,CVV */

  get name() {
    return this.checkoutForm.get('name');
  
  }
  get lastname() {
    return this.checkoutForm.get('lastname');
  
  }
  get email() {
    return this.checkoutForm.get('email');
  }
  get address() {
    return this.checkoutForm.get('address');
  
  }
  get country() {
    return this.checkoutForm.get('country');
  }
  get city() {
    return this.checkoutForm.get('city');
  }
  get postalCode() {
    return this.checkoutForm.get('postalCode');
  
  }
  get cardName() {
    return this.checkoutForm.get('cardName');
  
  }

  get creditCardNumber() {
    return this.checkoutForm.get('creditCardNumber');
  }
  get expiresIn() {
    return this.checkoutForm.get('expiresIn');
  
  }
  get year() {
    return this.checkoutForm.get('CVV');
  }

  get CVV() {
    return this.checkoutForm.get('CVV');
  }







  constructor(private cart: CartService,private router: Router) {
    this.userCart = this.cart.currentCart();
    
   }

  ngOnInit(): void {
    this.totalPurchase = this.totalAmount();
          if (this.userCart && this.userCart.length== 0) {
        alert("Agregue productos a su carrito antes de pagar");
        this.router.navigate(['/']);
      }
  }

  totalAmount(): number {
    let sum=0;
    for (let index = 0; index < this.userCart.length; index++) {
      sum = this.userCart[index].totalAmount + sum;
    }
    return sum;
  }
  
  checkoutProcess() {
    if (!this.checkoutForm.invalid) {
      if (this.userCart && this.userCart.length > 0) {
              alert("Su compra se esta procesando, le enviaremos un correo para confirmar");
               this.cart.purchaseCart([]);
              this.router.navigate(['/']);
      }
      else {
        alert("Agregue productos a su carrito antes de pagar");
        this.router.navigate(['/']);
      }

    }
    else {
    }
   
  }

}
