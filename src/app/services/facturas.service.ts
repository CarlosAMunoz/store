import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Factura } from '../model/Factura';
import { ResponseDto } from '../model/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private path =  `${environment.urlServerStore}/facturas/`

  constructor(private http: HttpClient) { }
  getFacturas(): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(`${this.path}todos`)
      .pipe(map(
        value=>{
          return value
        }
      ));
  }

  getFactura(id:number){
    return this.http.get<ResponseDto>(`${this.path}buscarporid/${id}`)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

  actualizarFactura(factura: any):Observable<ResponseDto>{
    console.log("Enviado al servicio")
    console.log(factura);
    return this.http.post<ResponseDto>(`${this.path}guardar`, factura)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

  eliminarFactura(id: number){
    return this.http.delete<ResponseDto>(`${this.path}eliminar/${id}`)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

}
