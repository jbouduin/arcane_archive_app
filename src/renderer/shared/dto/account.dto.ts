import { ApplicationRole } from "../types";

export type AccountDto = {
  accountName: string;
  accountActive: boolean;
  accountLocked: boolean;
  accountExpired: boolean;
  passwordExpired: boolean;
  roles: Array<ApplicationRole>;
};
