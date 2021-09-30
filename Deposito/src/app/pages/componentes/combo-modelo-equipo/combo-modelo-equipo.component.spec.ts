import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboModeloEquipoComponent } from './combo-modelo-equipo.component';

describe('ComboModeloEquipoComponent', () => {
  let component: ComboModeloEquipoComponent;
  let fixture: ComponentFixture<ComboModeloEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboModeloEquipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboModeloEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
