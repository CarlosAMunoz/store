import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../shared/model/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  @Output() disparadorId: EventEmitter<any> = new EventEmitter();
  private path =  `${environment.urlServerStore}/productos/`

  constructor(private http: HttpClient) { }

  getProductos(): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(`${this.path}todos`)
      .pipe(map(
        value=>{
          return value
        }
      ));
  }

  getProducto(id:number){
    return this.http.get<ResponseDto>(`${this.path}buscarporid/${id}`)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

  actualizarProducto(producto: any):Observable<ResponseDto>{
    console.log("Enviado al servicio")
    console.log(producto);
    return this.http.post<ResponseDto>(`${this.path}guardar`, producto)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

  eliminarProducto(id: number){
    return this.http.delete<ResponseDto>(`${this.path}eliminar/${id}`)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

}
