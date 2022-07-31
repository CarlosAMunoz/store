import { Component, OnInit } from '@angular/core';

import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  notiCarrito:any;

  constructor(private svcCarrito:CarritoService) { }

  ngOnInit(): void {

     this.notiCarrito = this.svcCarrito.getCarritos()
     .subscribe(value=>{
      const dataObject = Object.values(value);
      if (dataObject[0] == 200){
        this.notiCarrito = dataObject[2].length;
      }
    });
  }
}

