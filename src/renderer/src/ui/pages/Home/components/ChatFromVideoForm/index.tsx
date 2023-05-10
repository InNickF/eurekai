import { getAudioFromVideo } from "@renderer/services/api/files";
import { useUserConfigByUserId } from "@renderer/services/queries/user-configs";
import { useMe } from "@renderer/services/queries/users";
import { User } from "@renderer/types";
import { useForm } from "react-hook-form";
import { useLoadingChatFile } from "../../hooks/useLoadingChatFile";

interface ChatFromVideoFormFields {
  video: FileList;
  context: string;
  speakersQuantity: number;
}

export const ChatFromVideoForm = () => {
  const { initLoading, resetLoader, setLoaderMessage, loaderState } =
    useLoadingChatFile();
  const { data: user } = useMe();
  const { data: userConfig } = useUserConfigByUserId(user?.id as User["id"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChatFromVideoFormFields>({
    defaultValues: {
      speakersQuantity: 1,
    },
  });

  const getTranscriptionFromVideo = async (video: File) => {
    if (!userConfig || !userConfig.apiKey) return;

    initLoading("Getting audio from video.");
    const audioResponse = await getAudioFromVideo(video);

    setLoaderMessage("Sending audio to get transcription.");
    // const transcriptionResponse = await getAudioTranscription(
    //   audioResponse.audioFile,
    //   userConfig?.apiKey!
    // );

    resetLoader();
    return {
      ...audioResponse,
      // transcriptionResponse,
    };
  };

  const onSubmit = async (data: ChatFromVideoFormFields) => {
    console.log("data", data);

    const transcriptionResponse = await getTranscriptionFromVideo(
      data.video[0]
    );
    console.log("response", transcriptionResponse);
  };

  return (
    <>
      <form>
        <label htmlFor="video">Video</label>
        <input
          {...register("video", {
            required: true,
          })}
          type="file"
          accept=".mp4,.mkv,.avi,.mov,.webm"
        />
        <br />
        <br />
        <label htmlFor="context">Context</label>
        <input
          {...register("context", {
            required: true,
          })}
          type="text"
        />
        <br />
        <br />
        <label htmlFor="speakersQuantity">Speakers quantity</label>
        <input
          {...register("speakersQuantity", {
            required: true,
            min: 1,
          })}
          type="number"
          step={1}
        />
        <br />
        <br />
        <button onClick={handleSubmit(onSubmit)}>Submit</button>
      </form>
      <br />
      <br />
      {loaderState.isLoading && <p>loading...</p>}
      {loaderState.message && <p>{loaderState.message}</p>}
    </>
  );
};
