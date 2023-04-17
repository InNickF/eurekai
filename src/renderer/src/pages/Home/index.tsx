import { AnimationProps, motion } from "framer-motion";
import { FC } from "react";
import { Link } from "react-router-dom";

export const HomePage: FC<AnimationProps> = (props) => {
  return (
    <motion.section
      key="home"
      className="grid place-content-center h-screen"
      {...props}
    >
      <p>Hello Word</p>
      <Link to="/config">Config</Link>
    </motion.section>
  );
};
