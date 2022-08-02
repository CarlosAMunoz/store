import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ComprarComponent } from './comprar/comprar.component';
import { FacturasComponent } from './facturas/facturas.component';
import { EditProductosComponent } from './productos/edit-productos/edit-productos.component';
import { ProductosComponent } from './productos/productos.component';
import { HeaderComponent } from './shared/header/header.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
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
  },
  {
    path: 'usuario/:id',
    component:UsuarioComponent
  },
  {
    path: 'carrito',
    component:CarritoComponent
  },

  {
    path:'header',
    component:HeaderComponent,

  },
  {
    path:'facturas',
    component:FacturasComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]


})
export class AppRoutingModule { }
