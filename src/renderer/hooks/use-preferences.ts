import { useContext } from "react";
import { PreferencesContext } from "../shared/context";

/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("Preference context not available");
  return ctx;
};
