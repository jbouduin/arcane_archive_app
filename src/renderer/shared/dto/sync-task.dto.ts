import { SyncTaskMode } from "../types";

export type SyncTaskDto = {
  target: string;
  subTarget: string | null;
  mode: SyncTaskMode;
  dumpData: boolean;
};
