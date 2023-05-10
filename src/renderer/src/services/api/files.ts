export const getAudioFromVideo = async (video: File) => {
  const audioResponse = await window.api.getAudioFromVideo({
    file: video.path,
  });
  const audioUint8Array = new Uint8Array(audioResponse.audioBuffer);
  const audioFile = new File([audioUint8Array], audioResponse.audioName, {
    type: "audio/mp3",
  });
  return {
    ...audioResponse,
    audioFile,
  };
};
