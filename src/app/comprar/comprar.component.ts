import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Productos } from '../model/Productos';
import { CarritoService } from '../services/carrito.service';
import { ComprarService } from '../services/comprar.service';
import { Categorias } from '../model/Categorias';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  listCharacters:Productos[]=[];
  listCategorias:Categorias[]=[];

  constructor(private svcProductos:ProductosService, private svcCarrito:CarritoService, private svcComprar:ComprarService, private svcCategoria:CategoriasService) { }
  ngOnInit(): void {

   //LISTA LAS CATEGORIAS
    this.svcCategoria.getCategorias().subscribe(value=>{
      const dataObject = Object.values(value);
      console.log("data Object")
      console.log(dataObject)
      if (dataObject[0] == 200){
        this.listCategorias = dataObject[2];
      }
    });



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
    console.log(producto);
    let carrito = this.svcComprar.setCarrito(producto)
    this.svcCarrito.actualizarCarrito(carrito).subscribe(
      value=>{
        const dataObject = Object.values(value);
        if (dataObject[0] == 201){
          alert('Producto agregado al carrito satisfactoriamente')
        }
      }
    )
  }


  filtrar(e:any){
    console.log("evento capturado");
    console.log(e.target.value);
    this.svcProductos.getProductosByCategoria(e.target.value)
    .subscribe(value=>{
      const dataObject = Object.values(value);
      if (dataObject[0] == 200){
        this.listCharacters = dataObject[2];
        console.log( this.listCharacters);
      }
    });


  }

}
