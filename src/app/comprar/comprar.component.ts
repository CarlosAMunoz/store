import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Productos } from '../model/Productos';
import { CarritoService } from '../services/carrito.service';
import { ComprarService } from '../services/comprar.service';
import { Categorias } from '../model/Categorias';
import { CategoriasService } from '../services/categorias.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  listCharacters:any[]=[];
  listCategorias:Categorias[]=[];

  public dataForm:FormGroup;
  public cantidadForm:FormGroup;

  constructor(private svcProductos:ProductosService,
    private svcCarrito:CarritoService,
    private svcComprar:ComprarService,
    private svcCategoria:CategoriasService,
    protected formBuilder: FormBuilder,
    private router: Router){
      this.dataForm = this.formBuilder.group({
        id_Categoria:['-1']
      });

      this.cantidadForm = this.formBuilder.group({
        cantidad:['1']
      });
    }


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

    console.log(producto, this.cantidadForm.value.cantidad);
    let carrito = this.svcComprar.setCarrito(producto,  this.cantidadForm.value.cantidad)
    this.svcCarrito.actualizarCarrito(carrito).subscribe(
      value=>{
        const dataObject = Object.values(value);
        if (dataObject[0] == 201){


          alert("Producto agregado al carrito")

        }
      }
    )
  }


  filtrar(e:any){
    console.log(e.target.value);
    if (e.target.value == -1){
      this.cargarData();
    }else{
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



}
