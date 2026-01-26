import { LogLevel } from "../enums";
import { ArcanArchiveServer } from "./arcane-archive-server";

export type MainLogSource = "Main" | "Renderer" | "API" | "DB";
export type ResponseLogSource = ArcanArchiveServer | "IPC";
export type LogSetting<T> = {
  source: T;
  level: LogLevel;
};
export type MainLogSetting = LogSetting<MainLogSource>;
export type ResponseLogSetting = LogSetting<ResponseLogSource>;
