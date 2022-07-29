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

  public objetoCategorias!:Categorias;

  public listCategorias!:Categorias[];


  constructor(protected formBuilder: FormBuilder,
    private svcProductos: ProductosService,
    private svcCategoria: CategoriasService,
    private snackBar:MatSnackBar,
    private router: Router) {
      this.productosForm = this.formBuilder.group({
        id:[0],
        nombre:['', [Validators.required]],
        descripcion:['', [Validators.required, Validators.maxLength(200)]],
        precio:[, [Validators.required]],
        id_Categoria:[, [Validators.required]],
        cantidadDisponible:[, [Validators.required]],
      });
    }

  ngOnInit(): void {

    this.svcProductos.disparadorId
    .subscribe(value =>{
      this.svcProductos.getProducto(value)
      .subscribe(value=>{
        const dataObject = Object.values(value);
        if (dataObject[0] == 200){
          this.productosForm.patchValue(dataObject[2]);

        }
      });
    });


    //LISTA LAS CATEGORIAS
    this.svcCategoria.getCategorias().subscribe(value=>{
      const dataObject = Object.values(value);
      console.log("data Object")
      console.log(dataObject)
      if (dataObject[0] == 200){
        this.listCategorias = dataObject[2];
      }
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
    console.log("Datos asignados al productosForm y enviados a DB");
    console.log(this.productosForm.value);
    this.svcProductos.actualizarProducto(this.productosForm.value).subscribe(
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
    )
  }
}
