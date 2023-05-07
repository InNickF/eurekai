import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge } from "electron";
import {
  GetAudioFromVideoArgs,
  getAudioFromVideo,
} from "../main/services/getAudioFromVideo";

// Custom APIs for renderer
export const api = {
  getAudioFromVideo: async (args: GetAudioFromVideoArgs) => {
    const result = (await electronAPI.ipcRenderer.invoke(
      "get-audio-from-video",
      args
    )) as ReturnType<typeof getAudioFromVideo>;
    return result;
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
