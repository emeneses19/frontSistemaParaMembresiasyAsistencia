import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmetodopagoComponent } from './addmetodopago.component';

describe('AddmetodopagoComponent', () => {
  let component: AddmetodopagoComponent;
  let fixture: ComponentFixture<AddmetodopagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmetodopagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddmetodopagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
