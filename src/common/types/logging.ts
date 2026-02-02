import { LogLevel } from "../enums";
import { ArcaneArchiveServer } from "./arcane-archive-server";

export type MainLogSource = "Main" | "Renderer" | "API" | "DB";
export type ResponseLogSource = ArcaneArchiveServer | "IPC";
export type LogSetting<T> = {
  source: T;
  level: LogLevel;
};
export type MainLogSetting = LogSetting<MainLogSource>;
export type ResponseLogSetting = LogSetting<ResponseLogSource>;
