import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAdd_oldComponent } from './employee-add_old.component';

describe('EmployeeAddComponent', () => {
  let component: EmployeeAdd_oldComponent;
  let fixture: ComponentFixture<EmployeeAdd_oldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeAdd_oldComponent]
    });
    fixture = TestBed.createComponent(EmployeeAdd_oldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
