import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../model/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class FacturaProductoService {

  private path =  `${environment.urlServerStore}/factura_producto/`

  constructor(private http: HttpClient) { }
  getFacturas_Producto(): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(`${this.path}todos`)
      .pipe(map(
        value=>{
          return value
        }
      ));
  }

  getFacturas_ProductoByFactura(): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(`${this.path}buscarporfactura`)
      .pipe(map(
        value=>{
          return value
        }
      ));
  }




  getFactura_Producto(id:number){
    return this.http.get<ResponseDto>(`${this.path}buscarporid/${id}`)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

  actualizarFactura_Producto(factura_producto: any):Observable<ResponseDto>{
    console.log("Enviado al servicio factura_producto")
    console.log(factura_producto);
    return this.http.post<ResponseDto>(`${this.path}guardar`, factura_producto)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }


  eliminarFactura_Producto(id: number){
    return this.http.delete<ResponseDto>(`${this.path}eliminar/${id}`)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }
}
