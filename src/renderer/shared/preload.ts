import { contextBridge, ipcRenderer } from "electron";
import { IpcChannel, IpcRequest, IpcResponse, ProgressCallback, ProgressCallbackValue } from "../../common/ipc";

const versions = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
};

const ipc = {
  // Renderer to Main
  data: <T, U>(channel: IpcChannel, request: IpcRequest<T>) => {
    const r = ipcRenderer.invoke(channel, request);
    return r as Promise<IpcResponse<U>>;
  },
  onProgress: (callback: ProgressCallback) => {
    // to avoid memory leaks and as only the splash screen is listening to it
    ipcRenderer.removeAllListeners("splash");
    ipcRenderer.on("splash", (_event, value) => callback(value as ProgressCallbackValue));
  },
  // TODO remove me showMainWindow: () => ipcRenderer.invoke("show-main-window")
};

// expose
contextBridge.exposeInMainWorld("versions", versions);
contextBridge.exposeInMainWorld("ipc", ipc);

export type Versions = typeof versions;
export type IPC = typeof ipc;
