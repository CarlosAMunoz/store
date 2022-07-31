import { Usuario } from "./Usuario";


export interface Factura{

  id_Factura:number,
  total:number,
  id_Usuario:Usuario,
  nombre_Usuario:string,
  fecha_Compra:Date
}
