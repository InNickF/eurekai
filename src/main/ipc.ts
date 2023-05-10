import { ipcMain } from "electron";
import { clearAllGeneratedAudioFiles } from "./services/clearAllGeneratedAudioFiles";
import { getAudioFromVideo } from "./services/getAudioFromVideo";

export const initIPC = (): void => {
  ipcMain.handle("get-audio-from-video", getAudioFromVideo);
  ipcMain.on("clear-all-generated-audio-files", clearAllGeneratedAudioFiles);
};
