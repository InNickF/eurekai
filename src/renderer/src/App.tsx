import { Layout } from "@renderer/types";
import { RouterTransition } from "@renderer/ui/components/layout/RouterTransition";
import { ChatsPage } from "@renderer/ui/pages/Chats";
import { ConfigPage } from "@renderer/ui/pages/Config";
import { HomePage } from "@renderer/ui/pages/Home";
import { LoginPage } from "@renderer/ui/pages/Login";
import { FC, LegacyRef, createRef } from "react";
import {
  RouteObject,
  createBrowserRouter,
  useLocation,
  useOutlet,
} from "react-router-dom";
import { ChatPage } from "./ui/pages/Chat";
import { ErrorPage } from "./ui/pages/ErrorPage";

type CustomRouteObject = RouteObject & {
  label?: string;
  icon?: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodeRef?: LegacyRef<any>;
  layout?: Layout;
};

export const routes: CustomRouteObject[] = [
  {
    path: "/chats",
    element: <ChatsPage />,
    id: "chats",
    label: "Chats",
    nodeRef: createRef(),
    layout: ChatsPage.layout,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chats/:chatId",
    element: <ChatPage />,
    id: "chat",
    label: "Chat",
    nodeRef: createRef(),
    layout: ChatPage.layout,
    errorElement: <ErrorPage />,
  },
  {
    path: "/config",
    element: <ConfigPage />,
    id: "config",
    label: "Config",
    nodeRef: createRef(),
    layout: ConfigPage.layout,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    id: "login",
    label: "Login",
    nodeRef: createRef(),
    layout: LoginPage.layout,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <HomePage />,
    id: "home",
    label: "New chat",
    nodeRef: createRef(),
    layout: HomePage.layout,
    errorElement: <ErrorPage />,
  },
];

const dynamicPaths = [{ match: "/chats/", value: "/chats/:chatId" }];

export const App: FC = () => {
  const currentOutlet = useOutlet();
  const location = useLocation();

  const pathToMatch =
    dynamicPaths.find((path) => location.pathname.includes(path.match))
      ?.value || location.pathname;

  const layout = routes.find((route) => route.path === pathToMatch)?.layout;

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
