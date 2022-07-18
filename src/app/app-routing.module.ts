import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprarComponent } from './comprar/comprar.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  {
    path:'',
    component:ComprarComponent,
  },

  {
    path:'home',
    component:ComprarComponent,
  },
  {
    path:'productos',
    component:ProductosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]


})
export class AppRoutingModule { }
