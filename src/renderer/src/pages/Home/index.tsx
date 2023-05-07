import { AppLayout } from "@renderer/components/layout/AppLayout";
import { Page } from "@renderer/types";
import { FC } from "react";

export const HomePage: Page<FC> = () => {
  const pingPong = async () => {
    const res = await window.electron.ipcRenderer.invoke("ping");
    console.log(res);
  };
  return (
    <>
      <h1>Hi</h1>
      <button onClick={pingPong}>Ping</button>
    </>
  );
};

HomePage.layout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};
