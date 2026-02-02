export type SessionContextType = {
  loggedIn: boolean;
  userName?: string;
  email?: string;
  // TODO add isAppAdmin and isSysAdmin
};
