import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

const DetailField = ({ label, value, colSpan = 1 }) => (
  <div className={`flex flex-col ${colSpan === 2 ? "md:col-span-2" : ""}`}>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <p className="mt-1 text-sm text-gray-800">{value}</p>
  </div>
);

const ProductDetail = () => {
  const product = {
    urunKodu: "PRD-1001",
    urunAdi: "Widget Alpha",
    urunAciklama: "Bu ürün üstün performanslı bir modüldür.",
    satisFiyati: "249.99",
    maliyetFiyati: "180.50",
    birim: "Adet",
    stokAdedi: "50",
    kdvOrani: "20",
    bildirimEsigi: "10",
    kullanilanParcalar: ["Sigorta", "Kondansatör", "Trafo"],
  };

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
        className="sm:w-3xl md:w-4xl lg:w-5xl mx-auto p-6 bg-gray-50 border border-gray-200/50 rounded-xl shadow-sm mt-6 text-gray-800"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Ürün Detayları
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <DetailField label="Ürün Kodu" value={product.urunKodu} />
          <DetailField label="Ürün İsmi" value={product.urunAdi} />
          <DetailField
            label="Açıklama"
            value={product.urunAciklama}
            colSpan={2}
          />
          <DetailField
            label="Satış Fiyatı (TL)"
            value={`${parseFloat(product.satisFiyati).toFixed(2)} TL`}
          />
          <DetailField
            label="Maliyet Fiyatı (TL)"
            value={`${parseFloat(product.maliyetFiyati).toFixed(2)} TL`}
          />
          <DetailField label="Birim" value={product.birim} />
          <DetailField label="Stok Adedi" value={product.stokAdedi} />
          <DetailField label="Bildirim Eşiği" value={product.bildirimEsigi} />
          <DetailField label="KDV Oranı (%)" value={`${product.kdvOrani}%`} />

          {/* Kullanılan Parçalar */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-500">
              Kullanılan Parçalar
            </label>
            {product.kullanilanParcalar.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {product.kullanilanParcalar.map((parca, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {parca}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-500">Parça belirtilmemiş</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Aksiyon Butonları */}
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
};

export default ProductDetail;
