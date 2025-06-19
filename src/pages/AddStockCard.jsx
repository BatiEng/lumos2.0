import React, { useState } from "react";
import { motion } from "framer-motion";

// Mock data for suppliers
const mockSuppliers = [
  "Tech Suppliers Ltd.",
  "Global Imports Inc.",
  "Quality Goods Co.",
  "Industrial Partners",
  "Eco Supplies",
];

// Animation variants for the container
const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Animation variants for buttons and dropdown
const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

function AddStockCard() {
  const [formData, setFormData] = useState({
    urunKodu: "",
    urunIsmi: "",
    stokAdedi: "",
    tedarikciIsmi: "",
    alisFiyati: "",
    satisFiyati: "",
    birimMiktari: "",
    kdvOrani: "0",
    bildirimMiktari: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupplierSelect = (supplier) => {
    setFormData((prev) => ({ ...prev, tedarikciIsmi: supplier }));
    setSearchTerm(supplier);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add logic to handle form submission (e.g., API call)
  };

  const filteredSuppliers = mockSuppliers.filter((supplier) =>
    supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="max-w-2xl mx-auto p-6 bg-gray-50 border border-gray-200/50 rounded-xl shadow-sm mt-6 text-gray-800"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Yeni Stok Kartı Ekle
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500">Ürün Kodu</label>
          <input
            type="text"
            name="urunKodu"
            value={formData.urunKodu}
            onChange={handleChange}
            className="mt-1 text-lg font-mono text-gray-700 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500">Ürün İsmi</label>
          <input
            type="text"
            name="urunIsmi"
            value={formData.urunIsmi}
            onChange={handleChange}
            className="mt-1 text-lg font-light text-gray-700 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500">
            Stok Adedi
          </label>
          <input
            type="number"
            name="stokAdedi"
            value={formData.stokAdedi}
            onChange={handleChange}
            className="mt-1 text-lg font-mono text-gray-700 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500"
            min="0"
            required
          />
        </div>
        <div className="flex flex-col relative">
          <label className="text-sm font-medium text-gray-500">
            Tedarikçi İsmi
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
            className="mt-1 text-lg font-light text-gray-700 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500"
            placeholder="Tedarikçi ara..."
            required
          />
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-10"
            >
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier, index) => (
                  <div
                    key={index}
                    onClick={() => handleSupplierSelect(supplier)}
                    className="p-2 text-lg font-light text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {supplier}
                  </div>
                ))
              ) : (
                <div className="p-2 text-lg font-light text-gray-500">
                  Tedarikçi bulunamadı
                </div>
              )}
            </motion.div>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500">
            Alış Fiyatı (TL)
          </label>
          <input
            type="number"
            name="alisFiyati"
            value={formData.alisFiyati}
            onChange={handleChange}
            className="mt-1 text-lg font-mono text-gray-700 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500">
            Satış Fiyatı (TL)
          </label>
          <input
            type="number"
            name="satisFiyati"
            value={formData.satisFiyati}
            onChange={handleChange}
            className="mt-1 text-lg font-mono text-gray-700 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500">
            Birim Bazında Miktarı (Adet)
          </label>
          <input
            type="number"
            name="birimMiktari"
            value={formData.birimMiktari}
            onChange={handleChange}
            className="mt-1 text-lg font-mono text-gray-700 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500"
            min="1"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500">
            KDV Oranı (%)
          </label>
          <select
            name="kdvOrani"
            value={formData.kdvOrani}
            onChange={handleChange}
            className="mt-1 text-lg font-mono text-gray-700 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500"
            required
          >
            <option value="0">0%</option>
            <option value="1">1%</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500">
            Bildirim Miktarı
          </label>
          <input
            type="number"
            name="bildirimMiktari"
            value={formData.bildirimMiktari}
            onChange={handleChange}
            className="mt-1 text-lg font-mono text-gray-700 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500"
            min="0"
            required
          />
        </div>
      </form>
      <div className="mt-8 flex justify-end gap-3">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleSubmit}
          className="relative bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group cursor-pointer"
        >
          <span className="relative z-10">Kaydet</span>
          <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => {
            setFormData({
              urunKodu: "",
              urunIsmi: "",
              stokAdedi: "",
              tedarikciIsmi: "",
              alisFiyati: "",
              satisFiyati: "",
              birimMiktari: "",
              kdvOrani: "0",
              bildirimMiktari: "",
            });
            setSearchTerm("");
          }}
          className="relative bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium overflow-hidden group cursor-pointer"
        >
          <span className="relative z-10">Temizle</span>
          <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default AddStockCard;
