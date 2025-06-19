import React from "react";
import { motion } from "framer-motion";

// Kart animasyonları
const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: {
    scale: 1.02,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
};

// Buton animasyonları
const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

function CariCardItem({ row, unvan, bakiye, onDokumClick, onOdemeClick }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm mb-2 text-sm text-gray-800"
    >
      <div className="w-12 font-mono text-gray-500 font-medium">{row}</div>
      <div className="w-64 font-semibold text-gray-700">{unvan}</div>
      <div
        className={`w-32 text-right font-mono ${
          bakiye > 0
            ? "text-green-600"
            : bakiye < 0
            ? "text-red-500"
            : "text-gray-500"
        }`}
      >
        {parseFloat(bakiye).toFixed(2)} ₺
      </div>
      <div className="w-64 flex justify-end gap-2">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onDokumClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium"
        >
          Cari Döküm
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onOdemeClick}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium"
        >
          Ödeme
        </motion.button>
      </div>
    </motion.div>
  );
}

export default CariCardItem;
