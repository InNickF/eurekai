import { ipcMain } from "electron";

export const initIPC = (): void => {
  ipcMain.handle("ping", async (_, ...args) => {
    console.log("ping", args);
    return "pong";
  });
};
