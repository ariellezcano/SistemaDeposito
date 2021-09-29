import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmEquipoComponent } from './abm-equipo.component';

describe('AbmEquipoComponent', () => {
  let component: AbmEquipoComponent;
  let fixture: ComponentFixture<AbmEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmEquipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
