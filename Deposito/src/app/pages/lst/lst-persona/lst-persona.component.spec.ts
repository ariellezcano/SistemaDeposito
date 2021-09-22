import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstPersonaComponent } from './lst-persona.component';

describe('LstPersonaComponent', () => {
  let component: LstPersonaComponent;
  let fixture: ComponentFixture<LstPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
