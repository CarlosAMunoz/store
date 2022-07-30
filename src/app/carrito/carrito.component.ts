import { Component, OnInit } from '@angular/core';
import { Carrito } from '../model/Carrito';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {


  displayedColumns: string[] = ['id_Producto', 'precio', 'cantidad', 'Acciones']
  dataSource!:Carrito[]

  constructor(private svcCarrito:CarritoService) { }

  ngOnInit(): void {

    this.cargarData()
  }

  cargarData(){
    this.svcCarrito.getCarritos().subscribe(value=>{
      const dataObject = Object.values(value);
      if (dataObject[0] == 200){
        this.dataSource = dataObject[2];
        console.log("Información regresada de la DB")
        console.log(this.dataSource);
      }
    });
  }

  eliminar(id: number){
    this.svcCarrito.eliminarCarrito(id).subscribe(value=>{
      const dataObject = Object.values(value);
      console.log(dataObject);
      if (dataObject[0] == 201){
        this.cargarData()
      }
    })
  }

  editarRegistro(id: number){
    this.svcCarrito.disparadorId.emit(id)
  }
}
