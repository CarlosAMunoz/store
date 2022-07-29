import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Productos } from '../model/Productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['id','nombre', 'descripcion', 'precio', 'id_Categoria', 'cantidadDisponible', 'Acciones']
  dataSource!:Productos[]
  objectCategoria!:Object;

  constructor(private svcProductos:ProductosService) { }

  ngOnInit(): void {

    this.cargarData()
  }

  cargarData(){
    this.svcProductos.getProductos().subscribe(value=>{
      const dataObject = Object.values(value);
      console.log(dataObject);
      if (dataObject[0] == 200){
        this.dataSource = dataObject[2];
      }
    });
  }

  eliminar(id: number){
    this.svcProductos.eliminarProducto(id).subscribe(value=>{
      const dataObject = Object.values(value);
      console.log(dataObject);
      if (dataObject[0] == 201){
        this.cargarData()
      }
    })
  }

  editarRegistro(id: number){
    this.svcProductos.disparadorId.emit(id)
  }

}
