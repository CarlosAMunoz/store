import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { Carrito } from '../model/Carrito';
import { Factura } from '../model/Factura';
import { CarritoService } from '../services/carrito.service';
import { FacturasService } from '../services/facturas.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  displayedColumns: string[] = ['nombre_Producto', 'cantidad', 'precio', 'Acciones'];
  dataSource!:Carrito[]
  date:any;

  constructor(private svcCarrito:CarritoService, private svcFactura:FacturasService) { }

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



  comprarCarrito(){

    this.date=new Date();
    let factura:any={
      id_Usuario:{
        id_Usuario:this.dataSource[0].id_Usuario,
      },
      nombre_Usuario:'Pendiente',
      total:500000,
      fecha_Compra:this.date
    }

    this.svcFactura.actualizarFactura(factura).subscribe(
      value=>{
        const dataObject = Object.values(value);
        if (dataObject[0] == 201){
            alert("Agregado a la factura")
          }
      });

  }

}
