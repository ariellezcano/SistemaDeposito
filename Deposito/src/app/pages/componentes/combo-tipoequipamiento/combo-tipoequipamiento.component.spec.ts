import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboTipoequipamientoComponent } from './combo-tipoequipamiento.component';

describe('ComboTipoequipamientoComponent', () => {
  let component: ComboTipoequipamientoComponent;
  let fixture: ComponentFixture<ComboTipoequipamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboTipoequipamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboTipoequipamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
