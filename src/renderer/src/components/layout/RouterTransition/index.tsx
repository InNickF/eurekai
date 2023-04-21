import { routes } from "@renderer/App";
import { FC, PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./index.css";

export const RouterTransition: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={150}
        classNames="router-transition"
        unmountOnExit
      >
        {() => (
          <section ref={nodeRef} className="router-transition">
            {children}
          </section>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
};
