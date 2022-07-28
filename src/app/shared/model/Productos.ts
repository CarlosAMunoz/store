import { Categorias } from "./Categorias";

export interface Productos{

  id:number,
  nombre:string,
  descripcion:string,
  precio:number,
  id_Categoria:Categorias,
  //categoria:string,
  // asignarCategorias?:[],
  imagen:string
  cantidadDisponible:number;
}
