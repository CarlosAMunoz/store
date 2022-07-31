import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComprarService {


  setCarrito(producto:any, cantidad:number){
    let carrito:any= {
      id_Producto: 0,
      id_Usuario: 0,
      cantidad: 0,
      nombre_Producto: '',
      precio: 0
    };
    carrito.id_Producto = producto.id;
    carrito.id_Usuario = 1;
    carrito.cantidad = cantidad;
    carrito.nombre_Producto = producto.nombre;
    carrito.precio = producto.precio;

    return carrito;
  }

}

