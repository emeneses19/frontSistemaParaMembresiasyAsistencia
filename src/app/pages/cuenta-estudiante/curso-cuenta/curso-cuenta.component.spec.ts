import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoCuentaComponent } from './curso-cuenta.component';

describe('CursoCuentaComponent', () => {
  let component: CursoCuentaComponent;
  let fixture: ComponentFixture<CursoCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoCuentaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
