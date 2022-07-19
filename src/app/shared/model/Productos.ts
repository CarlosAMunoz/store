export interface Productos{

  id:number,
  nombre:string,
  descripcion:string,
  precio:number,
  categorias?:[],
  asignarCategorias?:[],
  imagen:string
}
