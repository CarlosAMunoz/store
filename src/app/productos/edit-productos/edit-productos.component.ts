import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Categorias } from 'src/app/model/Categorias';

@Component({
  selector: 'app-edit-productos',
  templateUrl: './edit-productos.component.html',
  styleUrls: ['./edit-productos.component.css']
})
export class EditProductosComponent implements OnInit {

  public productosForm:FormGroup;
  private submitted: boolean = false;
  public listCategorias!:Categorias[];



  constructor(protected formBuilder: FormBuilder,
    private svcProductos: ProductosService,
    private svcCategoria: CategoriasService,
    private snackBar:MatSnackBar,
    private router: Router) {
      this.productosForm = this.formBuilder.group({
        id:[0],
        nombre_Producto:['', [Validators.required]],
        descripcion:['', [Validators.required, Validators.maxLength(200)]],
        precio:[, [Validators.required]],
        id_Categoria:[0, [Validators.required]],
        cantidadDisponible:[, [Validators.required]],
      });
    }

  ngOnInit(): void {

    //LISTA LAS CATEGORIAS
    this.svcCategoria.getCategorias().subscribe(value=>{
      const dataObject = Object.values(value);
      console.log("data Object")
      console.log(dataObject)
      if (dataObject[0] == 200){
        this.listCategorias = dataObject[2];
      }
    });


    this.svcProductos.disparadorId
    .subscribe(value =>{
      console.log("value traido del disparador")
      console.log(value);
      this.svcProductos.getProducto(value)
      .subscribe(value=>{
        const dataObject = Object.values(value);
        if (dataObject[0] == 200){
          this.productosForm.patchValue(dataObject[2]);
          let productoTraido:any;
          productoTraido = dataObject[2];
          this.productosForm.patchValue(productoTraido.id_Categoria)

        }
      });
    });
  }

  guardar(){

    this.submitted = true;
    if (this.submitted && this.productosForm.invalid){
      this.snackBar.open('Faltan datos obligatorios', 'Ok', {
        horizontalPosition:'center',
        verticalPosition:'bottom',
        duration:5000
      })
      return;
    }

    let productos:any={
      id:null,
      nombre_Producto:'',
      descripcion:'',
      precio:0,
      id_Categoria:{
        id_Categoria:0,
        nombre:''
      },
      cantidadDisponible:0,
      imagen:''
    }


    productos.id = this.productosForm.value.id;
    productos.nombre_Producto = this.productosForm.value.nombre_Producto;
    productos.descripcion = this.productosForm.value.descripcion;
    productos.precio = this.productosForm.value.precio;
    productos.id_Categoria.id_Categoria = this.productosForm.value.id_Categoria;
    productos.cantidadDisponible = this.productosForm.value.cantidadDisponible;

    console.log("Datos enviados para guardar");



    this.svcProductos.actualizarProducto(productos).subscribe(
      value=>{
        const dataObject = Object.values(value);
        if (dataObject[0] == 201){
          this.productosForm.patchValue = dataObject[2];
          console.log("Datos asignados al productosForm y regresados");
          console.log(this.productosForm.value)
          this.snackBar.open('Producto agregado satisfactoriamente', 'Ok', {
            horizontalPosition:'center',
            verticalPosition:'top',
            duration:5000
          })
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/productos']);
          });
        }
      }
    );
  }


  onUpload(){
    alert ("subir");
  }


}
