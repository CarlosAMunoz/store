import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../shared/model/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  @Output() disparadorId: EventEmitter<any> = new EventEmitter();

  private path =  `${environment.urlServerStore}/categorias/`

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(`${this.path}todos`)
      .pipe(map(
        value=>{
          return value
        }
      ));
  }

  getCategoria(id:number){
    return this.http.get<ResponseDto>(`${this.path}buscarporid/${id}`)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

  actualizarCategoria(categoria: any):Observable<ResponseDto>{
    return this.http.post<ResponseDto>(`${this.path}guardar`, categoria)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

  eliminarCategoria(id: number){
    return this.http.delete<ResponseDto>(`${this.path}eliminar/${id}`)
    .pipe(map(
      value=>{
        return value
      }
    ));
  }

}
