import { AnimatePresence, AnimationProps } from "framer-motion";
import { FC } from "react";
import {
  Route,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { HomePage } from "./pages/Home";
import { ConfigPage } from "./pages/Config";

type CustomRouteObject = RouteObject & { label?: string; icon?: JSX.Element };

const animationConfig: AnimationProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    type: "spring",
    duration: 1,
  },
};

export const routes: CustomRouteObject[] = [
  {
    path: "/",
    element: <HomePage {...animationConfig} />,
    id: "home",
    label: "Home",
  },
  {
    path: "/config",
    element: <ConfigPage {...animationConfig} />,
    id: "config",
    label: "config",
  },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    routes.map((route) => (
      <Route key={route.id} path={route.path!} element={route.element} />
    ))
  )
);

export const App: FC = () => {
  return (
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
};
