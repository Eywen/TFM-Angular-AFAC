import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employee_listComponent } from './employee_list.component';

describe('EmployeeComponent', () => {
  let component: Employee_listComponent;
  let fixture: ComponentFixture<Employee_listComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Employee_listComponent]
    });
    fixture = TestBed.createComponent(Employee_listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
