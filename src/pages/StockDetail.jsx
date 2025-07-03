import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const initialData = {
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

const containerVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  tap: { scale: 0.98 },
};

function StockDetail() {
  const [editMode, setEditMode] = useState(false);
  const [stockData, setStockData] = useState(initialData);
  const [backupData, setBackupData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStockData((prev) => ({
      ...prev,
      [name]: isNaN(value) ? value : Number(value),
    }));
  };

  const handleEdit = () => {
    setBackupData(stockData);
    setEditMode(true);
  };

  const handleCancel = () => {
    setStockData(backupData);
    setEditMode(false);
  };

  const handleSave = () => {
    console.log("Updated stock data:", stockData);
    setEditMode(false);
  };

  const handleStokEkle = () => console.log("Stok Ekle clicked");

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Bu stoğu silmek istediğinize emin misiniz?"
    );
    if (confirmDelete) {
      console.log("Stok silindi:", stockData);
      // Add API call here for actual deletion
    }
  };

  const fields = [
    { label: "Ürün Kodu", name: "urunKodu", type: "text" },
    { label: "Ürün İsmi", name: "urunIsmi", type: "text" },
    { label: "Stok Adedi", name: "stokAdedi", type: "number" },
    { label: "Tedarikçi İsmi", name: "tedarikciIsmi", type: "text" },
    { label: "Alış Fiyatı", name: "alisFiyati", type: "number" },
    { label: "Satış Fiyatı", name: "satisFiyati", type: "number" },
    { label: "Birim Bazında Miktarı", name: "birimMiktari", type: "number" },
    { label: "KDV Oranı (%)", name: "kdvOrani", type: "number" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="w-full max-w-4xl p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
          Stok Detayı
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(({ label, name, type }) => (
            <motion.div
              key={name}
              variants={itemVariants}
              className="flex flex-col"
            >
              <label className="text-sm font-medium text-gray-600 mb-2">
                {label}
              </label>
              {editMode ? (
                <input
                  type={type}
                  name={name}
                  value={stockData[name]}
                  onChange={handleChange}
                  className="p-3 bg-gray-100/50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                  placeholder={label}
                />
              ) : (
                <span className="text-lg font-mono text-gray-800 bg-gray-100/50 p-3 rounded-lg">
                  {stockData[name]}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-8">
          <span className="text-sm font-medium text-gray-600 mb-2 block">
            Bildirim Ayarı
          </span>
          {editMode ? (
            <input
              type="number"
              name="bildirimMiktari"
              value={stockData.bildirimMiktari}
              onChange={handleChange}
              className="p-3 bg-gray-100/50 border border-gray-200 rounded-lg text-sm w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              placeholder="Bildirim Miktarı"
            />
          ) : (
            <p className="text-lg font-light text-gray-700 bg-gray-100/50 p-3 rounded-lg">
              Stok miktarı {stockData.bildirimMiktari} birimin altına inince
              bildirim ver
            </p>
          )}
        </motion.div>

        <div className="mt-10 flex justify-end gap-4">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleStokEkle}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Stok Ekle
          </motion.button>

          <AnimatePresence>
            {!editMode ? (
              <>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleEdit}
                  className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  Düzenle
                </motion.button>
                <Link to={"/stok-yonetimi/stok-kartlari"}>
                  {" "}
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleEdit}
                    className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    Geri Dön
                  </motion.button>
                </Link>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleDelete}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  Sil
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  Kaydet
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  İptal
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default StockDetail;
