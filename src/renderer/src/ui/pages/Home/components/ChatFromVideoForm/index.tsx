import { getAudioFromVideo } from "@renderer/services/api/files";
import { getAudioTranscription } from "@renderer/services/api/openai";
import { queryKeys } from "@renderer/services/keys";
import { usePromptsByUserId } from "@renderer/services/queries/prompts";
import { useMe } from "@renderer/services/queries/users";
import { ChatPayload } from "@renderer/types";
import { createChatWithMessages } from "@renderer/utils/createChatWithMessages";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoadingChatFile } from "../../hooks/useLoadingChatFile";

interface ChatFromVideoFormFields {
  video: FileList;
  context: string;
  speakersQuantity: number;
  initialPrompt: string;
}

export const ChatFromVideoForm = () => {
  const { initLoading, resetLoader, setLoaderMessage, loaderState } =
    useLoadingChatFile();
  const { data: user } = useMe();
  const { data: initialPrompts } = usePromptsByUserId({ userId: user?.id! });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    if (!user?.config || !user?.config.apiKey) return;

    setLoaderMessage("Getting audio from video.");
    const audioResponse = await getAudioFromVideo(video);

    setLoaderMessage("Sending audio to get transcription.");
    const transcriptionResponse = await getAudioTranscription({
      audio: audioResponse.audioFile,
      openAIKey: user?.config?.apiKey,
    });

    const transcription = transcriptionResponse.text;
    return {
      ...audioResponse,
      transcription,
    };
  };

  const createChat = async (chat: ChatPayload, initialPrompt: string) => {
    setLoaderMessage("Creating chat.");
    const chatResponse = await createChatWithMessages({
      chat,
      initialPrompt,
    });
    return chatResponse;
  };

  const onSubmit = async (data: ChatFromVideoFormFields) => {
    initLoading();
    const transcriptionResponse = await getTranscriptionFromVideo(
      data.video[0]
    );

    if (!transcriptionResponse) return;
    if (!user?.id) return;

    const chat: ChatPayload = {
      context: data.context,
      speakersQuantity: data.speakersQuantity,
      type: "video",
      userId: user.id,
      description: null,
      initialized: false,
      serializedData: transcriptionResponse.transcription,
      sourceFileName: transcriptionResponse.videoName,
      systemMessage: null,
      title: null,
    };

    const createdChat = await createChat(chat, data.initialPrompt);
    resetLoader();

    if (createdChat) {
      queryClient.invalidateQueries([
        queryKeys.chats.all.queryKey,
        queryKeys.chats.allByUserId._def,
      ]);
      navigate(`/chats/${createdChat.id}`);
    }
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
            valueAsNumber: true,
            min: 1,
          })}
          type="number"
          step={1}
        />
        <br />
        <br />
        <label htmlFor="initialPrompt">Initial prompt</label>
        <select
          className="w-48"
          {...register("initialPrompt", {
            required: true,
          })}
        >
          {initialPrompts?.map((prompt) => (
            <option key={prompt.id} value={prompt.content}>
              {prompt.title || prompt.content}
            </option>
          ))}
        </select>
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
