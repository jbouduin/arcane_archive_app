import { SyncTaskMode, SyncTaskTarget } from "../types";

export type SyncTaskParamDto = {
  target: SyncTaskTarget;
  subTarget: string;
  mode: SyncTaskMode;
  dumpData: boolean;
};
