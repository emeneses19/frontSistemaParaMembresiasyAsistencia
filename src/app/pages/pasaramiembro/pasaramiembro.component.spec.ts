import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasaramiembroComponent } from './pasaramiembro.component';

describe('PasaramiembroComponent', () => {
  let component: PasaramiembroComponent;
  let fixture: ComponentFixture<PasaramiembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasaramiembroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasaramiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
