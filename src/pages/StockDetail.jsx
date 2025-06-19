import React from "react";
import { motion } from "framer-motion";

// Mock data for the stock item
const mockData = {
  urunKodu: "PRD-12345",
  urunIsmi: "Premium Widget X",
  stokAdedi: 25,
  tedarikciIsmi: "Tech Suppliers Ltd.",
  alisFiyati: 150.75,
  satisFiyati: 249.99,
  birimMiktari: 1,
  kdvOrani: 20,
  bildirimMiktari: 10,
};

// Animation variants for the container
const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Animation variants for buttons (matching StockCardItem)
const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

function StockDetail() {
  const {
    urunKodu,
    urunIsmi,
    stokAdedi,
    tedarikciIsmi,
    alisFiyati,
    satisFiyati,
    birimMiktari,
    kdvOrani,
    bildirimMiktari,
  } = mockData;

  // Placeholder button handlers
  const handleUretimeGonder = () => console.log("Üretime Gönder clicked");
  const handleStokEkle = () => console.log("Stok Ekle clicked");
  const handleDepoyaGonder = () => console.log("Depoya Gönder clicked");
  const handleDuzenle = () => console.log("Düzenle clicked");

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="max-w-2xl mx-auto p-6 bg-gray-50 border border-gray-200/50 rounded-xl shadow-sm mt-6 text-gray-800"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Stok Detayı
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Ürün Kodu</span>
            <span className="text-lg font-mono text-gray-700">{urunKodu}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Ürün İsmi</span>
            <span className="text-lg font-light text-gray-700">{urunIsmi}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Stok Adedi
            </span>
            <span className="text-lg font-mono text-gray-700">{stokAdedi}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Tedarikçi İsmi
            </span>
            <span className="text-lg font-light text-gray-700">
              {tedarikciIsmi}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Alış Fiyatı
            </span>
            <span className="text-lg font-mono text-gray-700">
              {alisFiyati.toFixed(2)} TL
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Satış Fiyatı
            </span>
            <span className="text-lg font-mono text-gray-700">
              {satisFiyati.toFixed(2)} TL
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Birim Bazında Miktarı
            </span>
            <span className="text-lg font-mono text-gray-700">
              {birimMiktari} Adet
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">KDV Oranı</span>
            <span className="text-lg font-mono text-gray-700">{kdvOrani}%</span>
          </div>
        </div>
        <div className="mt-6">
          <span className="text-sm font-medium text-gray-500">
            Bildirim Ayarı
          </span>
          <p className="text-lg font-light text-gray-700">
            Stok miktarı {bildirimMiktari} birimin altına inince bildirim ver
          </p>
        </div>
      </motion.div>
      <div className="mt-8 flex justify-end gap-3">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleUretimeGonder}
          className="relative bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group cursor-pointer"
        >
          <span className="relative z-10">Üretime Gönder</span>
          <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleStokEkle}
          className="relative bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group cursor-pointer"
        >
          <span className="relative z-10">Stok Ekle</span>
          <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleDepoyaGonder}
          className="relative bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group cursor-pointer"
        >
          <span className="relative z-10">Depoya Gönder</span>
          <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleDuzenle}
          className="relative bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group cursor-pointer"
        >
          <span className="relative z-10">Düzenle</span>
          <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.button>
      </div>
    </div>
  );
}

export default StockDetail;
