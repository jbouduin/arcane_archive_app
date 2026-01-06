import { Versions, IPC } from "./shared/preload";

declare global {
  interface Window {
    versions: Versions;
    ipc: IPC;
  }
}

export { };
