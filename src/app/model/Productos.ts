import { Categorias } from "./Categorias";

export interface Productos{

  id:number,
  nombre_Producto:string,
  descripcion:string,
  precio:number,
  id_Categoria:Categorias,
  imagen:string
  cantidadDisponible:number;
}
