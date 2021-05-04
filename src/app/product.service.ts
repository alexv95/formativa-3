import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public data  : Array<any>= [
    { name: 'naruto', code: "123", stock: 200, price: 500 },
    { name: 'boruto', code: "143", stock: 200, price: 2500 },
    { name: 'hunter', code: "192", stock: 200, price: 3500 },
    { name: 'pokemon', code: "291", stock: 200, price: 400 },
    { name: 'sailor moon', code: "145", stock: 200, price: 700 },
    { name: 'boku no hero', code: "165", stock: 200, price: 200 },
    { name: 'kimetsu', code: "191", stock: 200, price: 100 },
    { name: 'slime', code: "201", stock: 200, price: 500 },
    { name: 'dragon ball', code: "301", stock: 200, price: 300 },
    { name: 'super cub', code: "924", stock: 200, price: 200 },
    { name: 'shadow house', code: "101", stock: 200, price: 1000 },
  ];
  constructor() { }

  getProductData() {
    return this.data;
  }

  findCode(code: string) {
    for (let index = 0; index < this.data.length; index++){     
          if (this.data[index] && this.data[index].code === code) {
            return { result: true, productIndex: index };
          }
        }
    return { result: false, productIndex: -1 };
  }

  updateProduct(index: number, quantity: number) {
    this.data[index].stock = this.data[index].stock - quantity;
  }

  updateProductList(product :Array<any>) :void{
    this.data = product;
  }

}
