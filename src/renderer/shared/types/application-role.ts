import { SelectOption } from "./select-option";

export type ApplicationRole = "ROLE_APP_ADMIN" | "ROLE_SYS_ADMIN" | "ROLE_USER";

export const ROLES_SELECT_OPTIONS: Array<SelectOption<ApplicationRole>> = [
  { label: "User", value: "ROLE_USER" },
  { label: "Application Admin", value: "ROLE_APP_ADMIN" },
  { label: "System Administrator", value: "ROLE_SYS_ADMIN" }
];
