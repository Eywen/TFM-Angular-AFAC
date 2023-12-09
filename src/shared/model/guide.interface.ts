import {EmployeeI} from "./Employee.interface";
import {CustomerI} from "./customer.interface";

export interface GuideI {
  idGuide: number;
  recipient: string;
  address: string;
  city: string;
  telephone: number;
  status: string;
  entryDate: Date;
  deliveryDate: Date;
  assignmentDate: Date;
  activate: boolean;
  employee: EmployeeI;
  customer: CustomerI;
  formatEntryDate: string;
  formatassignmentDate: string;
  formatDeliveryDate: string;
}
