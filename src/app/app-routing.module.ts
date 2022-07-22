import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { ComprarComponent } from './comprar/comprar.component';
import { EditProductosComponent } from './productos/edit-productos/edit-productos.component';
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
  {
    path:'productos/:id',
    component:EditProductosComponent,
  },
  {
    path: 'categorias',
    component:CategoriasComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]


})
export class AppRoutingModule { }
