import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CariCardItem from "../components/CariCardItem";

// Mock data
const mockCariList = [
  {
    id: 1,
    unvan: "ABC Elektrik Ltd.",
    bakiye: 12450.75,
  },
  {
    id: 2,
    unvan: "Tekno İnşaat A.Ş.",
    bakiye: -3200.0,
  },
  {
    id: 3,
    unvan: "Demir Global",
    bakiye: 0,
  },
];

// Animasyon ayarları
const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
  },
};

function CariCards() {
  const handleDokumClick = (unvan) => {
    console.log(`Cari Döküm: ${unvan}`);
  };

  const handleOdemeClick = (unvan) => {
    console.log(`Ödeme işlemi: ${unvan}`);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen"
    >
      <div className="flex gap-10 items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Cari Hesaplar</h2>
        <Link
          to="/finans-yonetimi/cari-hesap-ekle"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Cari Hesap Ekle
        </Link>
      </div>

      <div className="bg-gray-50 border border-gray-200/50 rounded-xl shadow-sm p-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-200/50 rounded-lg text-sm font-medium text-gray-600 mb-2">
          <div className="w-12">Sıra</div>
          <div className="w-64">Ünvan</div>
          <div className="w-32 text-right">Bakiye</div>
          <div className="w-64 text-right">İşlemler</div>
        </div>

        {/* Cari Kart Listesi */}
        {mockCariList.map((cari, index) => (
          <CariCardItem
            key={cari.id}
            row={index + 1}
            unvan={cari.unvan}
            bakiye={cari.bakiye}
            onDokumClick={() => handleDokumClick(cari.unvan)}
            onOdemeClick={() => handleOdemeClick(cari.unvan)}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default CariCards;
