export const getAudioTranscription = async (audio: File, openAIKei: string) => {
  const formData = new FormData();
  formData.append("file", audio);
  formData.append("model", "whisper-1");

  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAIKei}`,
      },
      body: formData,
    }
  );
  const data = await response.json();
  return data;
};
