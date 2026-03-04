import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoPagosComponent } from './curso-pagos.component';

describe('CursoPagosComponent', () => {
  let component: CursoPagosComponent;
  let fixture: ComponentFixture<CursoPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoPagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
