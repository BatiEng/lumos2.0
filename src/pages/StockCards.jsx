import React from "react";
import { motion } from "framer-motion";
import StockCardItem from "../components/StockCardItem";
import { Link } from "react-router-dom";

// Mock data
const mockData = [
  { urunKodu: "UR001", urunIsmi: "6'lı Şartel", stokAdedi: 120 },
  { urunKodu: "UR002", urunIsmi: "Kondansatör", stokAdedi: 75 },
  { urunKodu: "UR003", urunIsmi: "Etiket Rulosu", stokAdedi: 340 },
];

// Animation variants for the container
const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
  },
};

function StockCards() {
  const handleUretimeGonder = (urunKodu) => {
    alert(`Üretime gönderildi: ${urunKodu}`);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen"
    >
      {/* Başlık + Ekle Butonu */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Stok Kartları</h2>
        <Link
          to="/stok-yonetimi/stok-ekle"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Stok Kartı Ekle
        </Link>
      </div>

      <div className="bg-gray-50 border border-gray-200/50 rounded-xl shadow-sm p-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-200/50 rounded-lg text-sm font-medium text-gray-600 mb-2">
          <div className="w-12">Sıra</div>
          <div className="w-40">Stok Kodu</div>
          <div className="w-64">Hammadde İsmi</div>
          <div className="w-24 text-center">Miktar</div>
          <div className="w-32 text-center">Aksiyon</div>
        </div>

        {/* Liste */}
        {mockData.map((item, index) => (
          <StockCardItem
            key={item.urunKodu}
            row={index + 1}
            urunKodu={item.urunKodu}
            urunIsmi={item.urunIsmi}
            stokAdedi={item.stokAdedi}
            onUretimeGonder={() => handleUretimeGonder(item.urunKodu)}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default StockCards;
