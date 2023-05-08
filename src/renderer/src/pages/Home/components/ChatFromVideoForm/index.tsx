import { getAudioTranscription } from "@renderer/services/api/openai";
import { useLoadingChatFile } from "../../hooks/useLoadingChatFile";
import { useUserConfigByUserId } from "@renderer/services/queries/user-configs";
import { useMe } from "@renderer/services/queries/users";

export const ChatFromVideoForm = () => {
  const { initLoading, reset, setMessage, state } = useLoadingChatFile();
  const { data: user } = useMe();
  const { data: userConfig } = useUserConfigByUserId(user?.id!);

  const getTranscriptionFromVideo = async (file?: File) => {
    if (!file) return;
    if (!userConfig || !userConfig.apiKey) return;

    initLoading("Getting audio from video.");
    const audioResponse = await window.api.getAudioFromVideo({
      file: file.path,
    });

    setMessage("Sending audio to get transcription.");
    const audioUint8Array = new Uint8Array(audioResponse.audioBuffer);
    const audioFile = new File([audioUint8Array], audioResponse.audioName, {
      type: "audio/mp3",
    });

    const transcriptionResponse = await getAudioTranscription(
      audioFile,
      userConfig?.apiKey!
    );

    console.log({
      ...audioResponse,
      audioFile,
      audioUint8Array,
      transcriptionResponse,
    });
    reset();
  };

  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          getTranscriptionFromVideo(e.target?.files?.[0]);
        }}
        accept=".mp4,.mkv,.avi,.mov,.webm"
      />
      <br />
      {state.isLoading && <p>loading...</p>}
      <br />
      {state.message && <p>{state.message}</p>}
    </>
  );
};
