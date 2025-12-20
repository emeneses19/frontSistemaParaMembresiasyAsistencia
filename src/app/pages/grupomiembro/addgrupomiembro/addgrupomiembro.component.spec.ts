import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgrupomiembroComponent } from './addgrupomiembro.component';

describe('AddgrupomiembroComponent', () => {
  let component: AddgrupomiembroComponent;
  let fixture: ComponentFixture<AddgrupomiembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddgrupomiembroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddgrupomiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
