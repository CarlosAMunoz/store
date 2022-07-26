import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Productos } from '../shared/model/Productos';

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



}
