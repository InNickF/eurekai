/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, LegacyRef, createRef } from "react";
import {
  RouteObject,
  createBrowserRouter,
  useLocation,
  useOutlet,
} from "react-router-dom";
import { RouterTransition } from "./components/layout/RouterTransition";
import { ConfigPage } from "./pages/Config";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { Layout } from "./types";

type CustomRouteObject = RouteObject & {
  label?: string;
  icon?: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodeRef?: LegacyRef<any>;
  layout?: Layout;
};

export const routes: CustomRouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
    id: "home",
    label: "Home",
    nodeRef: createRef(),
    layout: HomePage.layout,
  },
  {
    path: "/config",
    element: <ConfigPage />,
    id: "config",
    label: "Config",
    nodeRef: createRef(),
    layout: ConfigPage.layout,
  },
  {
    path: "/login",
    element: <LoginPage />,
    id: "login",
    label: "Login",
    nodeRef: createRef(),
    layout: LoginPage.layout,
  },
];

export const App: FC = () => {
  const currentOutlet = useOutlet();
  const location = useLocation();

  const layout = routes.find(
    (route) => route.path === location.pathname
  )?.layout;

  const renderLayout: Layout = layout ?? ((page) => page);

  return (
    <>{renderLayout(<RouterTransition>{currentOutlet}</RouterTransition>)}</>
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
