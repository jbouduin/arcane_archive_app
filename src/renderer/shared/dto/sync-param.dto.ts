import { SyncTaskMode } from "../types";
import { SyncTaskParamDto } from "./sync-task-param.dto";

export type SyncParamDto = {
  tasks: Array<SyncTaskParamDto>;
  allScryfallCatalogs: SyncTaskMode;
  allCardSets: SyncTaskMode;
};
