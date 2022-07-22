import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import { Categorias } from '../shared/model/Categorias';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  displayedColumns: string[] = ['id','nombre', 'Acciones']
  dataSource!:Categorias[]

  constructor(private svcCategorias:CategoriasService) { }

  ngOnInit(): void {

    this.cargarData()
  }

  cargarData(){
    this.svcCategorias.getCategorias().subscribe(value=>{
      const dataObject = Object.values(value);
      console.log(dataObject);
      if (dataObject[0] == 200){
        this.dataSource = dataObject[2];
      }
    });
  }

  eliminar(id: number){
    this.svcCategorias.eliminarCategoria(id).subscribe(value=>{
      const dataObject = Object.values(value);
      console.log(dataObject);
      if (dataObject[0] == 201){
        this.cargarData()
      }
    })
  }

  editarRegistro(id: number){
    this.svcCategorias.disparadorId.emit(id)
  }
}
