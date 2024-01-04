import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideAddComponent } from './guide-add.component';

describe('GuideAddComponent', () => {
  let component: GuideAddComponent;
  let fixture: ComponentFixture<GuideAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuideAddComponent]
    });
    fixture = TestBed.createComponent(GuideAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
