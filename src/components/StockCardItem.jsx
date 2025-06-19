import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function StockCardItem({
  row,
  urunKodu,
  urunIsmi,
  stokAdedi,
  onUretimeGonder,
  urunId,
}) {
  // Animation variants for the card
  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Animation variants for buttons
  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <Link to={`/stok-yonetimi/stok-kartlari/${urunId}`}>
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200/50 rounded-xl shadow-sm mb-3 text-sm text-gray-800 transition-all duration-300 hover:border-gray-300"
      >
        <div className="w-12 font-mono text-gray-500 font-medium">{row}</div>
        <div className="w-40 font-semibold text-gray-700 tracking-tight">
          {urunKodu}
        </div>
        <div className="w-64 truncate font-light text-gray-600">{urunIsmi}</div>
        <div className="w-24 text-center text-gray-500 font-mono">
          {stokAdedi}
        </div>
        <Link to={"/stok-yonetimi/stok-kartlari/asd"} className="flex gap-3">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="relative bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10">İncele</span>
            <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </Link>
      </motion.div>
    </Link>
  );
}

export default StockCardItem;
