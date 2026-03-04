import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCursoComponent } from './pago-curso.component';

describe('PagoCursoComponent', () => {
  let component: PagoCursoComponent;
  let fixture: ComponentFixture<PagoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
