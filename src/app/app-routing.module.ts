import { NgModule } from '@angular/core';

import { ProductComponent } from "./product/product.component";
import { CartlistComponent } from "./cartlist/cartlist.component";
import { Router, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
    { path: "", component: ProductComponent},
    {path: 'cartPayment', component: CartlistComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
