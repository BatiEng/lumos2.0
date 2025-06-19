import React, { useState } from "react";
import { motion } from "framer-motion";

// Mock data for parts
const mockParts = [
  "Sigorta",
  "Kondansatör",
  "Şalter",
  "Trafo",
  "Devre Kartı",
  "Kablo Bağı",
];

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

function AddProduct() {
  const [formData, setFormData] = useState({
    urunKodu: "",
    urunAdi: "",
    urunAciklama: "",
    satisFiyati: "",
    maliyetFiyati: "",
    birim: "",
    stokAdedi: "",
    kdvOrani: "0",
    bildirimEsigi: "",
    kullanilanParcalar: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredParts = mockParts.filter((parca) =>
    parca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePartSelect = (parca) => {
    if (!formData.kullanilanParcalar.includes(parca)) {
      setFormData((prev) => ({
        ...prev,
        kullanilanParcalar: [...prev.kullanilanParcalar, parca],
      }));
    }
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handlePartRemove = (parca) => {
    setFormData((prev) => ({
      ...prev,
      kullanilanParcalar: prev.kullanilanParcalar.filter((p) => p !== parca),
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      formData.satisFiyati < 0 ||
      formData.maliyetFiyati < 0 ||
      formData.stokAdedi < 0 ||
      formData.bildirimEsigi < 0
    ) {
      alert("Fiyatlar, stok adedi ve bildirim eşiği negatif olamaz.");
      return;
    }
    if (!formData.birim) {
      alert("Lütfen bir birim seçin.");
      return;
    }
    console.log("Ürün Kaydedildi:", formData);
  };

  const handleReset = () => {
    setFormData({
      urunKodu: "",
      urunAdi: "",
      urunAciklama: "",
      satisFiyati: "",
      maliyetFiyati: "",
      birim: "",
      stokAdedi: "",
      kdvOrani: "0",
      bildirimEsigi: "",
      kullanilanParcalar: [],
    });
    setSearchTerm("");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="max-w-3xl mx-auto p-6 bg-gray-50 border border-gray-200/50 rounded-xl shadow-sm mt-6 text-gray-800"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Yeni Ürün Ekle
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 grid-cols-1 md:grid-cols-2"
      >
        <InputField
          name="urunKodu"
          label="Ürün Kodu"
          value={formData.urunKodu}
          onChange={handleChange}
          required
        />
        <InputField
          name="urunAdi"
          label="Ürün İsmi"
          value={formData.urunAdi}
          onChange={handleChange}
          required
        />
        <TextareaField
          name="urunAciklama"
          label="Açıklama"
          value={formData.urunAciklama}
          onChange={handleChange}
        />
        <InputField
          name="satisFiyati"
          label="Satış Fiyatı (TL)"
          value={formData.satisFiyati}
          onChange={handleChange}
          type="number"
          min="0"
          required
        />
        <InputField
          name="maliyetFiyati"
          label="Maliyet Fiyatı (TL)"
          value={formData.maliyetFiyati}
          onChange={handleChange}
          type="number"
          min="0"
          required
        />
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500">Birim</label>
          <select
            name="birim"
            value={formData.birim}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Birim Seçin
            </option>
            <option value="Metre">Metre</option>
            <option value="Adet">Adet</option>
            <option value="Kilogram">Kilogram</option>
          </select>
        </div>
        <InputField
          name="stokAdedi"
          label="Stok Miktarı"
          value={formData.stokAdedi}
          onChange={handleChange}
          type="number"
          min="0"
          required
        />
        <InputField
          name="bildirimEsigi"
          label="Bildirim Eşiği"
          value={formData.bildirimEsigi}
          onChange={handleChange}
          type="number"
          min="0"
          required
        />
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500">
            KDV Oranı (%)
          </label>
          <select
            name="kdvOrani"
            value={formData.kdvOrani}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="0">0%</option>
            <option value="1">1%</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
          </select>
        </div>

        {/* Kullanılan Parçalar Arama */}
        <div className="flex flex-col relative col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-500">
            Kullanılan Parçalar
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder="Parça ara..."
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-10"
            >
              {filteredParts.length > 0 ? (
                filteredParts.map((parca, index) => (
                  <div
                    key={index}
                    onClick={() => handlePartSelect(parca)}
                    className="p-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                  >
                    {parca}
                  </div>
                ))
              ) : (
                <div className="p-2 text-sm text-gray-500">
                  Parça bulunamadı
                </div>
              )}
            </motion.div>
          )}

          {/* Seçilen parçaları göster */}
          {formData.kullanilanParcalar.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.kullanilanParcalar.map((p, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center"
                >
                  {p}
                  <button
                    type="button"
                    onClick={() => handlePartRemove(p)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6 col-span-1 md:col-span-2">
          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Kaydet
          </motion.button>
          <motion.button
            type="button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleReset}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Temizle
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

function InputField({ name, label, value, onChange, type = "text", ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 border border-gray-300 rounded-md"
        {...props}
      />
    </div>
  );
}

function TextareaField({ name, label, value, onChange }) {
  return (
    <div className="flex flex-col md:col-span-2">
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="mt-1 p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
}

export default AddProduct;
