import { SyncTaskMode } from "../types";
import { SyncTaskDto } from "./sync-task.dto";

export type SyncRequest = {
  tasks: Array<SyncTaskDto>;
  allScryfallCatalogs: SyncTaskMode;
  allCardSets: SyncTaskMode;
};
