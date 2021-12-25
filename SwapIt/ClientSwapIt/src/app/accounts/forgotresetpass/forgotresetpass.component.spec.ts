import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotresetpassComponent } from './forgotresetpass.component';

describe('ForgotresetpassComponent', () => {
  let component: ForgotresetpassComponent;
  let fixture: ComponentFixture<ForgotresetpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotresetpassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotresetpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
