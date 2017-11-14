import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFormViewComponent } from './password-form-view.component';

describe('PasswordFormViewComponent', () => {
  let component: PasswordFormViewComponent;
  let fixture: ComponentFixture<PasswordFormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordFormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
