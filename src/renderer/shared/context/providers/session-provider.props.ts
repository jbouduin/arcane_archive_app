import { ReactNode } from "react";
import { SessionChangeEvent } from "../types";

export interface SessionProviderProps {
  sessionData: SessionChangeEvent | null;
  children: ReactNode;
}
