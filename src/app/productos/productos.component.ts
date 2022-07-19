import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Productos } from '../shared/model/Productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['id','nombre', 'descripcion', 'precio', 'Acciones']
  dataSource!:Productos[]

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
}
