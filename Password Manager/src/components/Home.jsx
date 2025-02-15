import React from "react";
import { motion } from "framer-motion";
import Generator from "./Generator";

const HomePage = () => {
  return (
    <>
      <motion.div
        className="min-h-screen w-full sm:w-full flex flex-col justify-center items-center text-center text-white bg-gradient-to-r from lightpurple to darkpurple "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-white text-5xl sm:text-6xl lg:text-7xl text-center  mb-8 p-4  "
          initial={{
            y: -50,
            opacity: 0,
          }}
          animate={{
            y: 10,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 1,
            ease: "linear",
          }}
        >
          Welcome to Secure Pass
        </motion.h1>

        <motion.p
          className="text-4xl sm:text-5xl lg:text-6xl mb-8 p-4 "
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 10,
            opacity: 1,
          }}
          transition={{
            duration: 1.4,
            delay: 2,
            ease: "linear",
          }}
        >
          Generate and Manage Passwords Efficiently
        </motion.p>
        <motion.div
          className=" w-full  sm:w-4/5 lg:w-3/4"
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
            delay: 2.5,
            ease: "linear",
          }}
        >
          <Generator />
        </motion.div>
      </motion.div>
    </>
  );
};

export default HomePage;
