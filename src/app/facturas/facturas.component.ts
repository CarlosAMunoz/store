import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FacturasService } from '../services/facturas.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  listFacturas:any[]=[];
  listCharacters:any[]=[];
  sameFactura:any[]=[];

  public dataForm!:FormGroup;

  constructor(private svcFactura:FacturasService){}

  ngOnInit(): void {
     this.cargarData()
  }

  cargarData(){

    //Traer FACTURAS
    this.svcFactura.getFacturas().subscribe(value=>{
      const dataObject = Object.values(value);
      if (dataObject[0] == 200){
        this.listFacturas = dataObject[2];
        console.log("información en list Facturas")
        console.log(this.listFacturas);
      }
    });


  }
}
