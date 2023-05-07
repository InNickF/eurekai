import { IpcMainInvokeEvent } from "electron";

export type GetAudioFromVideoArgs = { file: string };

export type GetAudioFromVideo = (
  event: IpcMainInvokeEvent,
  args: GetAudioFromVideoArgs
) => string;

export const getAudioFromVideo: GetAudioFromVideo = (_event, ...args) => {
  const { file } = args[0];

  return file;
};
