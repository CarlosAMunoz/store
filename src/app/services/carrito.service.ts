import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../model/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  @Output() disparadorId: EventEmitter<any> = new EventEmitter();

  private path =  `${environment.urlServerStore}/carrito/`

  constructor(private http: HttpClient) { }

  getCarritos(): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(`${this.path}todos`)
      .pipe(map(
        value=>{
          return value
        }
      ));
  }

  getCarrito(id:number){
    return this.http.get<ResponseDto>(`${this.path}buscarporid/${id}`)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

  actualizarCarrito(carrito: any):Observable<ResponseDto>{
    return this.http.post<ResponseDto>(`${this.path}guardar`, carrito)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

  eliminarCarrito(id: number){
    return this.http.delete<ResponseDto>(`${this.path}eliminar/${id}`)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }
}
