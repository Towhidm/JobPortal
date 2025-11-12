"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/10">
      {/* Animated glowing ring */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      >
        <div className="absolute w-30 h-30 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
        <motion.span
          className="text-blue-600 text-xl font-semibold"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Please Wait...
        </motion.span>
      </motion.div>
    </div>
  );
}
