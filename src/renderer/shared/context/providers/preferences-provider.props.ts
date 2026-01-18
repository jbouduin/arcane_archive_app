import { ReactNode } from "react";
import { PreferencesDto } from "../../../../common/dto";

export interface PreferencesProviderProps {
  preferences: PreferencesDto;
  children: ReactNode;
}
