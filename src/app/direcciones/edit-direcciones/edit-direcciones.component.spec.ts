import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDireccionesComponent } from './edit-direcciones.component';

describe('EditDireccionesComponent', () => {
  let component: EditDireccionesComponent;
  let fixture: ComponentFixture<EditDireccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDireccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDireccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
