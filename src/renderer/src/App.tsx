import { FC, LegacyRef, createRef } from "react";
import { RouteObject, createBrowserRouter, useOutlet } from "react-router-dom";
import { AppContainer } from "./components/layout/AppContainer";
import { Navbar } from "./components/layout/Navbar";
import { RouterTransition } from "./components/layout/RouterTransition";
import QueryProvider from "./components/others/QueryProvider";
import { ConfigPage } from "./pages/Config";
import { HomePage } from "./pages/Home";

type CustomRouteObject = RouteObject & {
  label?: string;
  icon?: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodeRef?: LegacyRef<any>;
};

export const routes: CustomRouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
    id: "home",
    label: "Home",
    nodeRef: createRef(),
  },
  {
    path: "/config",
    element: <ConfigPage />,
    id: "config",
    label: "Config",
    nodeRef: createRef(),
  },
];

export const App: FC = () => {
  const currentOutlet = useOutlet();
  return (
    <>
      <QueryProvider>
        <Navbar />
        <AppContainer>
          <RouterTransition>{currentOutlet}</RouterTransition>
        </AppContainer>
      </QueryProvider>
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);
