import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupomiembroComponent } from './grupomiembro.component';

describe('GrupomiembroComponent', () => {
  let component: GrupomiembroComponent;
  let fixture: ComponentFixture<GrupomiembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupomiembroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupomiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
