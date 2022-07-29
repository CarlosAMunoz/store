import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuarioForm:FormGroup;
  private submitted: boolean = false;


  constructor(protected formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private svcUsuario: UsuarioService,
    private snackBar:MatSnackBar,
    private router: Router) {
      this.usuarioForm = this.formBuilder.group({
        id_usuario:[1],
        nombre:['', [Validators.required]],
        email:['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    this.activateRouter.params.pipe(
      switchMap(({id})=>this.svcUsuario.getUsuario(id))
    ).subscribe(value=>{
      const dataObject = Object.values(value);
      if (dataObject[0] == 200){
        this.usuarioForm.patchValue(dataObject[2]);
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
    if (this.submitted && this.usuarioForm.invalid){
      this.snackBar.open('Faltan datos obligatorios', 'Ok', {
        horizontalPosition:'center',
        verticalPosition:'bottom',
        duration:5000
      })
      return;
    }

    console.log(this.usuarioForm.value)
    this.svcUsuario.actualizarUsuario(this.usuarioForm.value).subscribe(
      value=>{
        const dataObject = Object.values(value);
        if (dataObject[0] == 201){
          this.usuarioForm.patchValue = dataObject[2];
          this.snackBar.open('Usuario actualizado satisfactoriamente', 'Ok', {
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
