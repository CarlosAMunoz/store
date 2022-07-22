import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-edit-categorias',
  templateUrl: './edit-categorias.component.html',
  styleUrls: ['./edit-categorias.component.css']
})
export class EditCategoriasComponent implements OnInit {

  public categoriasForm:FormGroup;
  private submitted: boolean = false;


  constructor(protected formBuilder: FormBuilder,
    private svcCategorias: CategoriasService,
    private snackBar:MatSnackBar,
    private router: Router) {
      this.categoriasForm = this.formBuilder.group({
        id:[0],
        nombre:['', [Validators.required]],
      });
    }

  ngOnInit(): void {
    this.svcCategorias.disparadorId
    .subscribe(value =>{
      this.svcCategorias.getCategoria(value)
      .subscribe(value=>{
        const dataObject = Object.values(value);
        console.log(dataObject);
        if (dataObject[0] == 200){
          this.categoriasForm.patchValue(dataObject[2]);
        }
      });
    })
  }


  guardar(){
    this.submitted = true;
    if (this.submitted && this.categoriasForm.invalid){
      this.snackBar.open('Faltan datos obligatorios', 'Ok', {
        horizontalPosition:'center',
        verticalPosition:'bottom',
        duration:5000
      })
      return;
    }

    this.svcCategorias.actualizarCategoria(this.categoriasForm.value).subscribe(
      value=>{
        const dataObject = Object.values(value);
        if (dataObject[0] == 201){
          this.categoriasForm.patchValue = dataObject[2];
          this.snackBar.open('Categoría agregado satisfactoriamente', 'Ok', {
            horizontalPosition:'center',
            verticalPosition:'top',
            duration:5000
          })
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/categorias']);
          });
        }
      }
    )
  }
}
