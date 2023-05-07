import { ipcMain } from "electron";
import { getAudioFromVideo } from "./services/getAudioFromVideo";

export const initIPC = (): void => {
  ipcMain.handle("get-audio-from-video", getAudioFromVideo);
};
