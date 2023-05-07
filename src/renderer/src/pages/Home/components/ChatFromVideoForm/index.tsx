export const ChatFromVideoForm = () => {
  const sendVideoToGetAudio = async (file?: File) => {
    if (!file) return;
    const res = await window.api.getAudioFromVideo({ file: file.path });
    console.log(res);
  };

  return (
    <input
      type="file"
      onChange={(e) => {
        sendVideoToGetAudio(e.target?.files?.[0]);
      }}
    />
  );
};
