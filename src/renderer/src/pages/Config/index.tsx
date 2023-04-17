import { AnimationProps, motion } from "framer-motion";
import { FC } from "react";
import { Link } from "react-router-dom";
export const ConfigPage: FC<AnimationProps> = (props) => {
  return (
    <motion.section
      key="config"
      className="grid place-content-center h-screen"
      {...props}
    >
      <p>Config</p>
      <Link to="/">Home</Link>
    </motion.section>
  );
};
