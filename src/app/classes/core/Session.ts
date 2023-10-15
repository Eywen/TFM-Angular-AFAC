import {Role} from "../../../shared/model/enums/Role";

export interface Session {
  token: string;
  //mobile?: number;
  name?: string;
  role?: Role;
}
