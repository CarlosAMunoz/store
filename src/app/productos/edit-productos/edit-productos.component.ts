import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-productos',
  templateUrl: './edit-productos.component.html',
  styleUrls: ['./edit-productos.component.css']
})
export class EditProductosComponent implements OnInit {

  public dataForm:FormGroup;
  private submitted: boolean = false;


  constructor(protected formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private svcProductos: ProductosService,
    private snackBar:MatSnackBar,
    private router: Router) {
      this.dataForm = this.formBuilder.group({
        id:[0],
        nombre:['', [Validators.required]],
        descripcion:['', [Validators.required]],
        precio:[, [Validators.required]],
      });
    }

  ngOnInit(): void {
    this.activateRouter.params.pipe(
      switchMap(({id})=>this.svcProductos.getProducto(id))
    ).subscribe(value=>{
      const dataObject = Object.values(value);
      if (dataObject[0] == 200){
        this.dataForm.patchValue(dataObject[2]);
        this.snackBar.open(dataObject[1], 'Ok', {
          horizontalPosition:'center',
          verticalPosition:'bottom',
          duration:5000
        })
      }
    });
  }


  guardar(){
    this.submitted = true;
    if (this.submitted && this.dataForm.invalid){
      this.snackBar.open('Faltan datos obligatorios', 'Ok', {
        horizontalPosition:'center',
        verticalPosition:'bottom',
        duration:5000
      })
      return;
    }

    this.svcProductos.actualizarProducto(this.dataForm.value).subscribe(
      value=>{
        const dataObject = Object.values(value);
        if (dataObject[0] == 201){
          this.dataForm.patchValue = dataObject[2];
          this.snackBar.open(dataObject[1], 'Ok', {
            horizontalPosition:'center',
            verticalPosition:'bottom',
            duration:5000
          })
        }
      }
    )
  }
}
