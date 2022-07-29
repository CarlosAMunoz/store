import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DireccionesService } from 'src/app/services/direcciones.service';

@Component({
  selector: 'app-edit-direcciones',
  templateUrl: './edit-direcciones.component.html',
  styleUrls: ['./edit-direcciones.component.css']
})
export class EditDireccionesComponent implements OnInit {

  public direccionesForm:FormGroup;
  private submitted: boolean = false;


  constructor(protected formBuilder: FormBuilder,
    private svcDirecciones: DireccionesService,
    private snackBar:MatSnackBar,
    private router: Router) {
      this.direccionesForm = this.formBuilder.group({
        id_Direccion:[0],
        descripcion:['', [Validators.required]],
      });
    }

  ngOnInit(): void {
    this.svcDirecciones.disparadorId
    .subscribe(value =>{
      this.svcDirecciones.getDireccion(value)
      .subscribe(value=>{
        const dataObject = Object.values(value);
        console.log(dataObject);
        if (dataObject[0] == 200){
          this.direccionesForm.patchValue(dataObject[2]);
        }
      });
    })
  }


  guardar(){
    this.submitted = true;
    if (this.submitted && this.direccionesForm.invalid){
      this.snackBar.open('Faltan datos obligatorios', 'Ok', {
        horizontalPosition:'center',
        verticalPosition:'bottom',
        duration:5000
      })
      return;
    }
    console.log(this.direccionesForm.value)
    this.svcDirecciones.actualizarDireccion(this.direccionesForm.value).subscribe(
      value=>{
        const dataObject = Object.values(value);
        if (dataObject[0] == 201){
          this.direccionesForm.patchValue = dataObject[2];
          this.snackBar.open('Dirección agregado satisfactoriamente', 'Ok', {
            horizontalPosition:'center',
            verticalPosition:'top',
            duration:5000
          })
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/usuario/1']);
          });
        }
      }
    )
  }
}
