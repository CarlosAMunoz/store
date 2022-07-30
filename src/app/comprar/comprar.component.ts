import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Productos } from '../model/Productos';
import { Carrito } from '../model/Carrito';
import { CarritoComponent } from '../carrito/carrito.component';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  listCharacters:Productos[]=[]


  constructor(private svcProductos:ProductosService) { }
  ngOnInit(): void {
    this.cargarData()
  }

  cargarData(){
    this.svcProductos.getProductos().subscribe(value=>{
      const dataObject = Object.values(value);
      if (dataObject[0] == 200){
        this.listCharacters = dataObject[2];
        console.log( this.listCharacters);
      }
    });
  }


  agregarAlCarrito(producto:Productos){
    alert("Se agregará producto con Id " + producto)
    console.log(producto);


    let carrito:{
      id_Producto:number,
      id_Usuario:number
      cantidad:number,
      nombre_Producto:string
      precio:number
    } = {
      id_Producto: 0,
      id_Usuario: 0,
      cantidad: 0,
      nombre_Producto: '',
      precio: 0
    };


    carrito.id_Producto = producto.id;
    carrito.id_Usuario = 1;
    carrito.cantidad = 20;
    carrito.nombre_Producto = producto.nombre;
    carrito.precio = producto.precio;

    console.log(carrito);
  }


}
