import { Compilable } from "kysely";
import { ILogService } from "../../infra/interface";

export function debugCompilable<T extends Compilable>(logService: ILogService, compilable: T): T {
  const compiled = compilable.compile();
  logService.debug("DB", compiled.sql, compiled.parameters);
  return compilable;
}

export function traceCompilable<T extends Compilable>(logService: ILogService, compilable: T): T {
  const compiled = compilable.compile();
  logService.trace("DB", compiled.sql, compiled.parameters);
  return compilable;
}
