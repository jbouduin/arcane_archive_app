import { LogLevel } from "../enums";

export type LogSource = "Main" | "Renderer" | "API" | "DB";
export type LogSetting = {
  source: LogSource;
  level: LogLevel;
};
