import { FC, PropsWithChildren } from "react";
import "./index.css";

export const AppContainer: FC<PropsWithChildren> = ({ children }) => {
  return <main className="app-container entrance-animation">{children}</main>;
};
