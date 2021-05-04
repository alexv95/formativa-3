import { Component, OnInit } from '@angular/core';

import { ProductService } from "../product.service";
import { CartService } from "../cart.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dtOptions: any = {};
  dt = new ProductService();
  data = this.dt.getProductData();
 

  currentCart: Array<any>;
  formulario = new FormGroup({
    code: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    quantity: new FormControl(null, [Validators.required, Validators.minLength(1),Validators.min(1)]),
  })

  

  constructor(private router: Router , private userCart : CartService) {
  
  }
  ngOnDestroy():void {
    
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      responsive: true,
      /* below is the relevant part, e.g. translated to spanish */
      language: {
        processing: "Procesando...",
        search: "Buscar por nombre:",
        lengthMenu: "Mostrar _MENU_ elementos",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
      }
    }
    this.currentCart= this.userCart.currentCart();
     
      
  }
    
  
  
  get code() {
    return this.formulario.get('code');
  
  }
  get quantity() {
    return this.formulario.get('quantity');
  
  }

  updateCart() {
    let result = this.dt.findCode(this.formulario.controls["code"].value);
    if (result.result === true) {

      if (this.data[result.productIndex].stock >= this.formulario.controls["quantity"].value && this.formulario.controls["quantity"].value>0) {
        const findOnCart = this.findCurrentCart(this.formulario.controls["code"].value);
        if (findOnCart.result === true) {
          this.currentCart[findOnCart.productIndex].quantity = this.currentCart[findOnCart.productIndex].quantity + this.formulario.controls["quantity"].value;
          
        }
        else {
          this.currentCart.push({
          name: this.data[result.productIndex].name,
          code: this.formulario.controls["code"].value,
          quantity: this.formulario.controls["quantity"].value,
          unitPrice: this.data[result.productIndex].price,
          totalAmount: this.formulario.controls["quantity"].value *this.data[result.productIndex].price,
        });
          
        }
        
        this.dt.updateProduct(result.productIndex, this.formulario.controls["quantity"].value);
        this.data = this.dt.getProductData();
        this.userCart.purchaseCart(this.currentCart);       
      }
      else {
        alert("Revise que el stock que intenta llevar sea mayor a 0 y que se encuentre disponible");
      }
    }
    else {
      alert("verifique que su código no este vacío")
    }

  }

  deleteFromCart(position: number) {
    let result = this.dt.findCode(this.currentCart[position].code);
    this.data[result.productIndex].stock = this.data[result.productIndex].stock + this.currentCart[position].quantity;
    this.currentCart.splice(position,1);

  }

  operationForAmount(operation: string, position: number) {
    let result = this.dt.findCode(this.currentCart[position].code);
    alert(position);
    if (operation == "substract") {
      const substractOperation = this.currentCart[position].quantity - 1;
      if (substractOperation > 0) {
        this.currentCart[position].quantity = this.currentCart[position].quantity - 1;
        this.userCart.purchaseCart(this.currentCart);
        this.currentCart = this.userCart.currentCart();
        this.data[result.productIndex].stock = this.data[result.productIndex].stock + 1;
      } else {
        alert("Utilice el botón de borrar para eliminar del carrito");
      }
    }
    else {
      const matOperation = this.currentCart[position].quantity + 1;
      console.log(matOperation);
      if (this.data[result.productIndex].stock>=matOperation) {
        
        this.currentCart[position].quantity = this.currentCart[position].quantity + 1;
        this.userCart.purchaseCart(this.currentCart);
        this.currentCart = this.userCart.currentCart();
        this.data[result.productIndex].stock = this.data[result.productIndex].stock - 1;
      }
      else {
        alert("No contamos con más unidades disponibles");
      }   
    }
  }

  findCurrentCart(code:string) {
    
    for (let index = 0; index < this.currentCart.length; index++){     
          if (this.currentCart[index] && this.currentCart[index].code === code) {
            return { result: true, productIndex: index };
          }
        }
    return { result: false, productIndex: -1 };
  }

  payment() {
    if (this.currentCart && this.currentCart.length > 0) {
      this.data = this.dt.getProductData();
      this.router.navigate(['/cartPayment']);
    }
    else {
      alert("Su carrito no tiene items");
    }
  }
  
}




