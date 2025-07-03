import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

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

const popupVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// Mock parts data
const mockParts = [
  { urunKodu: "P001", isim: "Sigorta 10A", fiyat: 15, stokAdedi: 100 },
  { urunKodu: "P002", isim: "Kondansatör 100uF", fiyat: 35, stokAdedi: 50 },
  { urunKodu: "P003", isim: "Şalter 3 Faz", fiyat: 25, stokAdedi: 75 },
  { urunKodu: "P004", isim: "Trafo 220V-12V", fiyat: 100, stokAdedi: 20 },
  { urunKodu: "P005", isim: "Devre Kartı PCB", fiyat: 75, stokAdedi: 30 },
  { urunKodu: "P006", isim: "Kablo Bağı 100mm", fiyat: 5, stokAdedi: 200 },
  { urunKodu: "P007", isim: "Direnç 1kΩ", fiyat: 2, stokAdedi: 500 },
  { urunKodu: "P008", isim: "LED Kırmızı 5mm", fiyat: 3, stokAdedi: 300 },
  { urunKodu: "P009", isim: "Röle 12V", fiyat: 20, stokAdedi: 60 },
  { urunKodu: "P010", isim: "Kablo Kanalı 2m", fiyat: 45, stokAdedi: 40 },
  { urunKodu: "P011", isim: "Konnektör RJ45", fiyat: 10, stokAdedi: 150 },
  { urunKodu: "P012", isim: "Buton Anahtar", fiyat: 8, stokAdedi: 80 },
  { urunKodu: "P013", isim: "Sensör PIR", fiyat: 50, stokAdedi: 25 },
  { urunKodu: "P014", isim: "Diyot 1N4007", fiyat: 4, stokAdedi: 400 },
  { urunKodu: "P015", isim: "Mikroçip ATmega328", fiyat: 30, stokAdedi: 35 },
  { urunKodu: "P016", isim: "Fiş Erkek 16A", fiyat: 12, stokAdedi: 90 },
  { urunKodu: "P017", isim: "Klemens 2.5mm²", fiyat: 6, stokAdedi: 120 },
  { urunKodu: "P018", isim: "Buzzer 5V", fiyat: 7, stokAdedi: 100 },
  { urunKodu: "P019", isim: "Potansiyometre 10kΩ", fiyat: 9, stokAdedi: 70 },
  { urunKodu: "P020", isim: "Bakır Kablo 1.5mm²", fiyat: 25, stokAdedi: 50 },
];

const DetailField = ({
  label,
  value,
  editable,
  name,
  onChange,
  colSpan = 1,
  type = "text",
}) => (
  <motion.div
    variants={itemVariants}
    className={`flex flex-col ${colSpan === 2 ? "md:col-span-2" : ""}`}
  >
    <label className="text-sm font-medium text-gray-600 mb-2">{label}</label>
    {editable ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="p-3 bg-gray-100/50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
        placeholder={label}
      />
    ) : (
      <p className="text-lg font-mono text-gray-800 bg-gray-100/50 p-3 rounded-lg">
        {value}
      </p>
    )}
  </motion.div>
);

const ProductDetail = () => {
  const [editMode, setEditMode] = useState(false);
  const [backupProduct, setBackupProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [parts, setParts] = useState(mockParts);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [adetInputs, setAdetInputs] = useState({});

  const [product, setProduct] = useState({
    urunKodu: "PRD-1001",
    urunAdi: "Widget Alpha",
    urunAciklama: "Bu ürün üstün performanslı bir modüldür.",
    satisFiyati: 249.99,
    maliyetFiyati: 180.5,
    birim: "Adet",
    stokAdedi: 50,
    kdvOrani: 20,
    bildirimEsigi: 10,
    kullanilanParcalar: [
      {
        urunKodu: "P001",
        isim: "Sigorta 10A",
        fiyat: 15,
        adet: 2,
        toplam: 30,
        stokAdedi: 98,
      },
      {
        urunKodu: "P002",
        isim: "Kondansatör 100uF",
        fiyat: 35,
        adet: 1,
        toplam: 35,
        stokAdedi: 49,
      },
      {
        urunKodu: "P004",
        isim: "Trafo 220V-12V",
        fiyat: 100,
        adet: 1,
        toplam: 100,
        stokAdedi: 19,
      },
    ],
  });

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredParts = parts.filter((parca) =>
    parca.isim.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: typeMap[name] === "number" ? Number(value) : value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setFocusedIndex(-1);
  };

  const openSearchPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setIsPopupOpen(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isPopupOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < filteredParts.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleAddSelectedPart(
        filteredParts[focusedIndex],
        adetInputs[filteredParts[focusedIndex].urunKodu] || ""
      );
    } else if (e.key === "Escape") {
      closePopup();
    }
  };

  const handleAdetInputChange = (urunKodu, value) => {
    setAdetInputs((prev) => ({ ...prev, [urunKodu]: value }));
  };

  const handleAddSelectedPart = (parca, adetInput) => {
    if (!adetInput || isNaN(adetInput) || adetInput <= 0) {
      alert("Geçerli bir adet girin.");
      return;
    }

    if (parca.stokAdedi < Number(adetInput)) {
      alert("Yeterli stok mevcut değil!");
      return;
    }

    const newPart = {
      ...parca,
      adet: Number(adetInput),
      toplam: Number(adetInput) * parca.fiyat,
    };

    setParts((prevParts) =>
      prevParts.map((p) =>
        p.urunKodu === parca.urunKodu
          ? { ...p, stokAdedi: p.stokAdedi - Number(adetInput) }
          : p
      )
    );

    setProduct((prev) => ({
      ...prev,
      kullanilanParcalar: [...prev.kullanilanParcalar, newPart],
      maliyetFiyati: Number(prev.maliyetFiyati) + Number(newPart.toplam),
    }));

    setAdetInputs((prev) => ({ ...prev, [parca.urunKodu]: "" }));
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setIsPopupOpen(false);
  };

  const handlePartRemove = (urunKodu) => {
    setProduct((prev) => {
      const removedPart = prev.kullanilanParcalar.find(
        (p) => p.urunKodu === urunKodu
      );
      const filtered = prev.kullanilanParcalar.filter(
        (p) => p.urunKodu !== urunKodu
      );
      const newMaliyet = filtered.reduce((sum, p) => sum + p.toplam, 0);

      setParts((prevParts) =>
        prevParts.map((p) =>
          p.urunKodu === urunKodu
            ? { ...p, stokAdedi: p.stokAdedi + removedPart.adet }
            : p
        )
      );

      return {
        ...prev,
        kullanilanParcalar: filtered,
        maliyetFiyati: newMaliyet,
      };
    });
  };

  const handleDuzenle = () => {
    setBackupProduct(product);
    setEditMode(true);
  };

  const handleKaydet = () => {
    console.log("Updated product:", product);
    setEditMode(false);
  };

  const handleIptal = () => {
    setProduct(backupProduct);
    setEditMode(false);
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setAdetInputs({});
  };

  const handleStokEkle = () => console.log("Stok Ekle clicked");

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Bu ürünü silmek istediğinize emin misiniz?"
    );
    if (confirmDelete) {
      console.log("Ürün silindi:", product);
      // Add API call here for actual deletion
    }
  };

  const typeMap = {
    satisFiyati: "number",
    maliyetFiyati: "number",
    stokAdedi: "number",
    kdvOrani: "number",
    bildirimEsigi: "number",
  };

  const fields = [
    { label: "Ürün Kodu", name: "urunKodu", type: "text" },
    { label: "Ürün İsmi", name: "urunAdi", type: "text" },
    { label: "Açıklama", name: "urunAciklama", type: "text", colSpan: 2 },
    { label: "Satış Fiyatı (TL)", name: "satisFiyati", type: "number" },
    {
      label: "Maliyet Fiyatı (TL)",
      name: "maliyetFiyati",
      type: "number",
      disabled: true,
    },
    { label: "Birim", name: "birim", type: "text" },
    { label: "Stok Adedi", name: "stokAdedi", type: "number" },
    { label: "Bildirim Eşiği", name: "bildirimEsigi", type: "number" },
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
          Ürün Detayları
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {fields.map(({ label, name, type, colSpan, disabled }) => (
            <DetailField
              key={name}
              label={label}
              name={name}
              value={product[name]}
              editable={editMode && !disabled}
              onChange={handleChange}
              type={type}
              colSpan={colSpan}
            />
          ))}

          <motion.div
            variants={itemVariants}
            className="flex flex-col col-span-1 md:col-span-2"
          >
            <label className="text-sm font-medium text-gray-600 mb-2">
              Kullanılan Parçalar
            </label>
            {editMode && (
              <motion.button
                type="button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={openSearchPopup}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-md flex items-center justify-center w-full md:w-auto"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Parça Ekle
              </motion.button>
            )}
            <AnimatePresence>
              {isPopupOpen && (
                <motion.div
                  variants={popupVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                  onClick={closePopup}
                >
                  <motion.div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6"
                    onClick={(e) => e.stopPropagation()}
                    id="parts-popup"
                    role="dialog"
                    aria-modal="true"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Parça Seç
                      </h3>
                      <motion.button
                        onClick={closePopup}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Kapat"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ✕
                      </motion.button>
                    </div>
                    <div className="relative mb-4">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Parça ara (örn: Sigorta)"
                        className="w-full p-3 pl-12 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all"
                        autoFocus
                      />
                      <svg
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      {searchTerm && (
                        <motion.button
                          type="button"
                          onClick={() => setSearchTerm("")}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label="Aramayı temizle"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          ✕
                        </motion.button>
                      )}
                    </div>
                    <div className="space-y-3">
                      {filteredParts.length > 0 ? (
                        filteredParts.map((parca, index) => (
                          <motion.div
                            key={parca.urunKodu}
                            className={`p-4 bg-white rounded-lg shadow-sm hover:bg-blue-50 border border-gray-100 cursor-pointer transition-colors ${
                              index === focusedIndex ? "bg-blue-100" : ""
                            }`}
                            role="option"
                            aria-selected={index === focusedIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-sm font-semibold text-gray-800">
                                  {parca.isim}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Kodu: {parca.urunKodu} | Fiyat: ₺{parca.fiyat}{" "}
                                  | Stok: {parca.stokAdedi}
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <input
                                  type="number"
                                  min="1"
                                  value={adetInputs[parca.urunKodu] || ""}
                                  onChange={(e) =>
                                    handleAdetInputChange(
                                      parca.urunKodu,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Adet"
                                  className="p-2 border border-gray-200 rounded-lg w-20 focus:ring-2 focus:ring-blue-400 text-sm"
                                />
                                <motion.button
                                  type="button"
                                  variants={buttonVariants}
                                  whileHover="hover"
                                  whileTap="tap"
                                  onClick={() =>
                                    handleAddSelectedPart(
                                      parca,
                                      adetInputs[parca.urunKodu] || ""
                                    )
                                  }
                                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                  Ekle
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="p-4 text-sm text-gray-500 text-center">
                          Eşleşen parça bulunamadı
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {product.kullanilanParcalar.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-6"
                >
                  <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="p-3 font-semibold">Ürün Kodu</th>
                        <th className="p-3 font-semibold">İsim</th>
                        <th className="p-3 font-semibold">Adet</th>
                        <th className="p-3 font-semibold">Birim Fiyat (₺)</th>
                        <th className="p-3 font-semibold">Toplam (₺)</th>
                        <th className="p-3 font-semibold">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.kullanilanParcalar.map((p, i) => (
                        <motion.tr
                          key={p.urunKodu}
                          className="border-b bg-blue-50 hover:bg-blue-100"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td className="p-3">{p.urunKodu}</td>
                          <td className="p-3">{p.isim}</td>
                          <td className="p-3">{p.adet}</td>
                          <td className="p-3">{p.fiyat}</td>
                          <td className="p-3">{p.toplam.toFixed(2)}</td>
                          <td className="p-3">
                            {editMode && (
                              <motion.button
                                type="button"
                                onClick={() => handlePartRemove(p.urunKodu)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                                aria-label={`Kaldır ${p.isim}`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                ✕
                              </motion.button>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

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
                  onClick={handleDuzenle}
                  className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  Düzenle
                </motion.button>
                <Link to={"/urun-yonetimi/urunler"}>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
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
                  onClick={handleKaydet}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer"
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
                  onClick={handleIptal}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer"
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
};

export default ProductDetail;
