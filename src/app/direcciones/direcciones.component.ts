import { Component, OnInit } from '@angular/core';
import { DireccionesService } from '../services/direcciones.service';
import { Direcciones } from '../model/Direcciones';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  displayedColumns: string[] = ['descripcion', 'Acciones']
  dataSource!:Direcciones[]

  constructor(private svcDirecciones:DireccionesService) { }

  ngOnInit(): void {

    this.cargarData()
  }

  cargarData(){
    this.svcDirecciones.getDirecciones().subscribe(value=>{
      const dataObject = Object.values(value);
      if (dataObject[0] == 200){
        this.dataSource = dataObject[2];
        console.log("Información regresada de la DB")
        console.log(this.dataSource);
      }
    });
  }

  eliminar(id: number){
    this.svcDirecciones.eliminarDireccion(id).subscribe(value=>{
      const dataObject = Object.values(value);
      console.log(dataObject);
      if (dataObject[0] == 201){
        this.cargarData()
      }
    })
  }

  editarRegistro(id: number){
    this.svcDirecciones.disparadorId.emit(id)

  }
}
