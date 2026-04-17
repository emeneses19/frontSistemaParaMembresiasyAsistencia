import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamarListaComponent } from './llamar-lista.component';

describe('LlamarListaComponent', () => {
  let component: LlamarListaComponent;
  let fixture: ComponentFixture<LlamarListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlamarListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LlamarListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
