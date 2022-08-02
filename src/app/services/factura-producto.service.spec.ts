import { TestBed } from '@angular/core/testing';

import { FacturaProductoService } from './factura-producto.service';

describe('FacturaProductoService', () => {
  let service: FacturaProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
