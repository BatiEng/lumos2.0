import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Animation variants for the item
const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: {
    scale: 1.02,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
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

function ProductItem({ row, stokKodu, urunIsmi, urunAdedi, onUretimeGonder }) {
  return (
    <Link to={"/urun-yonetimi/urunler/as"}>
      <motion.div
        variants={itemVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 p-4 bg-gray-50 border border-gray-200/50 rounded-xl shadow-sm mb-2 text-sm text-gray-800"
      >
        <div className="w-12 font-mono text-gray-500 font-medium">{row}</div>
        <div className="w-40 font-semibold text-gray-700">{stokKodu}</div>
        <div className="w-full md:w-64 truncate font-light text-gray-600">
          {urunIsmi}
        </div>
        <div className="w-24 text-center font-mono text-gray-500">
          {urunAdedi}
        </div>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onUretimeGonder}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Üretime Gönder
        </motion.button>
      </motion.div>
    </Link>
  );
}

export default ProductItem;
