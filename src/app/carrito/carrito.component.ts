import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Carrito } from '../model/Carrito';
import { Direcciones } from '../model/Direcciones';
import { Factura } from '../model/Factura';
import { CarritoService } from '../services/carrito.service';
import { DireccionesService } from '../services/direcciones.service';
import { FacturaProductoService } from '../services/factura-producto.service';
import { FacturasService } from '../services/facturas.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  displayedColumns: string[] = ['nombre_Producto', 'cantidad', 'precio', 'Acciones'];
  dataSource:Carrito[]=[]
  date:any;
  public dataForm:FormGroup;
  listDirecciones!:Direcciones[];
  direccion!:number;
  public total:number=0;

  constructor(private svcCarrito:CarritoService, private svcFactura:FacturasService, private svcFactura_Producto:FacturaProductoService, private router: Router, protected formBuilder: FormBuilder, private svcDirecciones:DireccionesService) {

    this.dataForm = this.formBuilder.group({
      id_Direccion:['']
    });
   }

  ngOnInit(): void {

    this.cargarData()


       //LISTA LAS DIRECCIONES
       this.svcDirecciones.getDirecciones().subscribe(value=>{
        const dataObject = Object.values(value);
        console.log("data Object")
        console.log(dataObject)
        if (dataObject[0] == 200){
          this.listDirecciones = dataObject[2];

        }
      });

  }


  selectDireccion(e:any){
    this.direccion = e.target.value;
  }


  cargarData(){
    this.svcCarrito.getCarritos().subscribe(value=>{
      const dataObject = Object.values(value);
      if (dataObject[0] == 200){
        this.dataSource = dataObject[2];

        for (let index = 0; index <this.dataSource.length; index++) {
          this.total  =  (this.total + this.dataSource[index].precio)
        }
      }
    });
  }

  eliminar(id: number){
    this.svcCarrito.eliminarCarrito(id).subscribe(value=>{
      const dataObject = Object.values(value);
      console.log(dataObject);
      if (dataObject[0] == 201){

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/carrito']);
          });

      }
    })
  }




  comprarCarrito(){


    this.date=new Date();

    console.log("Lista de direcciones guardadas")
    console.log(this.listDirecciones[0].id_Usuario)

    let factura:any={
      id_Usuario:{
        id_Usuario:this.dataSource[0].id_Usuario,
      },
      nombre_Usuario:this.listDirecciones[0].id_Usuario.nombre,
      total: this.total,
      fecha_Compra:this.date,
      direccion:this.direccion
    }


    this.svcFactura.actualizarFactura(factura).subscribe(
      value=>{
        const dataObject = Object.values(value);
        if (dataObject[0] == 201){
          let response = dataObject[2]
          console.log(response)

          for (let index = 0; index <this.dataSource.length; index++) {

            const element = this.dataSource[index];
            let factura_producto:any={
              id_Factura:{
                id_Factura:response.id_Factura,
              },
              nombre_Producto:this.dataSource[index].nombre_Producto,
              id_Producto:{
                id:this.dataSource[index].id_Producto,
              },
              cantidad:this.dataSource[index].cantidad
              }

            this.svcFactura_Producto.actualizarFactura_Producto(factura_producto)
            .subscribe(value=>{})
          }


          this.svcCarrito.eliminarTodoCarrito()
          .subscribe(value=>{
            const dataObject = Object.values(value);
            if (dataObject[0] == 201){

              alert("Factura generada");
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/carrito']);
                });

            }
          })
        }
      }
    );
  }

}
