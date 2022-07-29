import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../model/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  @Output() disparadorId: EventEmitter<any> = new EventEmitter();

  private path =  `${environment.urlServerStore}/direcciones/`

  constructor(private http: HttpClient) { }

  getDirecciones(): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(`${this.path}todos`)
      .pipe(map(
        value=>{
          return value
        }
      ));
  }

  getDireccion(id:number){
    return this.http.get<ResponseDto>(`${this.path}buscarporid/${id}`)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

  actualizarDireccion(direccion: any):Observable<ResponseDto>{
    return this.http.post<ResponseDto>(`${this.path}guardar`, direccion)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

  eliminarDireccion(id: number){
    return this.http.delete<ResponseDto>(`${this.path}eliminar/${id}`)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }
}
