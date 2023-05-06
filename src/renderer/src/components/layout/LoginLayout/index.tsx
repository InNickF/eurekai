import { FC, PropsWithChildren } from "react";

export const LoginLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="grid place-content-center h-screen entrance-animation">
      {children}
    </section>
  );
};
