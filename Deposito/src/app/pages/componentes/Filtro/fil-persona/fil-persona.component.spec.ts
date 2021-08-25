import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilPersonaComponent } from './fil-persona.component';

describe('FilPersonaComponent', () => {
  let component: FilPersonaComponent;
  let fixture: ComponentFixture<FilPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
