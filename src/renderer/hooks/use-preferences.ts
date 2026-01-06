import { useContext } from "react";
import { PreferencesContext } from "../shared/context";

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("Preference context not available");
  return ctx;
};
