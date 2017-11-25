import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFormViewComponent } from './email-form-view.component';

describe('EmailFormViewComponent', () => {
  let component: EmailFormViewComponent;
  let fixture: ComponentFixture<EmailFormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailFormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
