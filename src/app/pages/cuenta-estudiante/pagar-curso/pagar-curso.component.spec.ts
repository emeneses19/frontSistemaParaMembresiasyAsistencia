import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarCursoComponent } from './pagar-curso.component';

describe('PagarCursoComponent', () => {
  let component: PagarCursoComponent;
  let fixture: ComponentFixture<PagarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagarCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
