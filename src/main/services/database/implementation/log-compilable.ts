import { Compilable } from "kysely";
import { ILogService } from "../../infra/interface";

// TODO add logging source kysely
export function debugCompilable<T extends Compilable>(logService: ILogService, compilable: T): T {
  const compiled = compilable.compile();
  logService.debug("Main", compiled.sql, compiled.parameters);
  return compilable;
}

export function traceCompilable<T extends Compilable>(logService: ILogService, compilable: T): T {
  const compiled = compilable.compile();
  logService.trace("Main", compiled.sql, compiled.parameters);
  return compilable;
}
