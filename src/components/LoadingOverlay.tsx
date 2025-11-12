"use client";
import { motion } from "framer-motion";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <motion.div
        className="relative flex flex-col items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute w-16 h-16 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
        <motion.span
          className="text-blue-600 text-lg font-semibold mt-20"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          Please wait...
        </motion.span>
      </motion.div>
    </div>
  );
}
