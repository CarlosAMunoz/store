import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angualr Material Modules
import { MatMenuModule } from '@angular/material/menu'
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ProductosComponent } from './productos/productos.component';
import { ComprarComponent } from './comprar/comprar.component';
import { MatTableModule} from '@angular/material/table';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { EditProductosComponent } from './productos/edit-productos/edit-productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EditCategoriasComponent } from './categorias/edit-categorias/edit-categorias.component';
import {MatSelectModule} from '@angular/material/select';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EditDireccionesComponent } from './direcciones/edit-direcciones/edit-direcciones.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductosComponent,
    ComprarComponent,
    EditProductosComponent,
    CategoriasComponent,
    EditCategoriasComponent,
    DireccionesComponent,
    UsuarioComponent,
    EditDireccionesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
