import fs from "fs";
import path from "path";
import os from "os";

export const clearAllGeneratedAudioFiles = async () => {
  const audioDir = path.join(os.homedir(), ".eurekai", "audios");

  // Read all files in the directory
  const files = await fs.promises.readdir(audioDir);

  // Delete each file
  const deletePromises = files.map((file) =>
    fs.promises.unlink(path.join(audioDir, file))
  );

  await Promise.all(deletePromises);
};
