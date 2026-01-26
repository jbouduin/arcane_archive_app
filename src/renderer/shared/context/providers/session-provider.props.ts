import { ReactNode } from "react";
import { SessionDto } from "../../../../common/dto";

export interface SessionProviderProps {
  sessionData: SessionDto | null;
  children: ReactNode;
}
