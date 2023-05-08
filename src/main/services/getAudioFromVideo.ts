import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { IpcMainInvokeEvent } from "electron";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import os from "os";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export type GetAudioFromVideoArgs = { file: string };
export type GetAudioFromVideoResult = {
  videoName: string;
  videoPath: string;
  audioName: string;
  audioPath: string;
  audioBuffer: Buffer;
};
export type GetAudioFromVideo = (
  event: IpcMainInvokeEvent,
  args: GetAudioFromVideoArgs
) => Promise<GetAudioFromVideoResult>;

export const getAudioFromVideo: GetAudioFromVideo = async (_event, ...args) => {
  const { file } = args[0];

  if (!fs.existsSync(file)) {
    throw new Error(`Video file not found: ${file}`);
  }

  const outputDir = path.join(os.homedir(), ".eurekai", "audios");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const videoName = path.parse(file).name + path.parse(file).ext;
  const videoPath = file;
  const outputFile = path.parse(file).name + ".mp3";
  const outputPath = path.join(outputDir, outputFile);

  // Check if the final audio file exists and remove it to avoid conflicts
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }

  const finalPath = await new Promise<string>((resolve, reject) => {
    ffmpeg(file)
      .outputOptions(["-vn", "-acodec", "libmp3lame", "-b:a", "192k"]) // Add -b:a option for bitrate
      .save(outputPath)
      .on("end", () => {
        resolve(outputPath);
      })
      .on("error", (err) => {
        reject(err);
      });
  });

  const audioBuffer = await fs.promises.readFile(finalPath);

  const result: GetAudioFromVideoResult = {
    videoName,
    videoPath,
    audioName: outputFile,
    audioPath: finalPath,
    audioBuffer,
  };

  return result;
};
