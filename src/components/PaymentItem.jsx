import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  tap: { scale: 0.98 },
};

const PaymentItem = ({ id, cari, tarih, odemeSekli, tutar }) => (
  <motion.div
    variants={itemVariants}
    className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg border border-white/20 rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="flex flex-1 items-center gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">Cari</p>
        <p className="text-base font-mono text-gray-800">{cari}</p>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">Tarih</p>
        <p className="text-base font-mono text-gray-800">{tarih}</p>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">Ödeme Şekli</p>
        <p className="text-base font-mono text-gray-800">{odemeSekli}</p>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">Tutar (₺)</p>
        <p className="text-base font-mono text-gray-800">{tutar.toFixed(2)}</p>
      </div>
    </div>
    <Link to={`/finans-yonetimi/odemeler/${id}`}>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-xl transition-all"
      >
        Detay
      </motion.button>
    </Link>
  </motion.div>
);

export default PaymentItem;
