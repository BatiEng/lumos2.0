import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";

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

const InputField = ({
  label,
  name,
  value,
  editable,
  onChange,
  type = "text",
}) => (
  <motion.div variants={itemVariants} className="flex flex-col">
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
        {value || "-"}
      </p>
    )}
  </motion.div>
);

function AlisFaturasiDetail() {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [backupData, setBackupData] = useState({});
  const [formData, setFormData] = useState({
    unvan: "Tedarikçi A.Ş.",
    faturaNo: "AF-20250703-001",
    faturaTarihi: "2025-07-03",
    faturaTutari: 7580.35,
    aciklama: "Temmuz ayı alış faturası",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "faturaTutari" ? parseFloat(value) : value,
    }));
  };

  const handleEdit = () => {
    setBackupData(formData);
    setEditMode(true);
  };

  const handleSave = () => {
    console.log("Fatura Güncellendi:", formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(backupData);
    setEditMode(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Bu alış faturasını silmek istediğinize emin misiniz?"
    );
    if (confirmDelete) {
      console.log("Fatura Silindi:", formData);
    }
  };

  const fields = [
    { label: "Ünvan", name: "unvan", type: "text" },
    { label: "Fatura No", name: "faturaNo", type: "text" },
    { label: "Fatura Tarihi", name: "faturaTarihi", type: "date" },
    { label: "Fatura Tutarı (₺)", name: "faturaTutari", type: "number" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="w-full max-w-3xl p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
          Alış Faturası Detayı
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {fields.map(({ label, name, type }) => (
            <InputField
              key={name}
              label={label}
              name={name}
              value={formData[name]}
              editable={editMode}
              onChange={handleChange}
              type={type}
            />
          ))}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:col-span-2"
          >
            <label className="text-sm font-medium text-gray-600 mb-2">
              Açıklama
            </label>
            {editMode ? (
              <textarea
                name="aciklama"
                value={formData.aciklama}
                onChange={handleChange}
                rows={3}
                className="p-3 bg-gray-100/50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              />
            ) : (
              <p className="text-lg font-mono text-gray-800 bg-gray-100/50 p-3 rounded-lg">
                {formData.aciklama || "-"}
              </p>
            )}
          </motion.div>
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <Link to="/alis-faturalari">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Geri Dön
            </motion.button>
          </Link>

          <AnimatePresence>
            {!editMode ? (
              <>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleEdit}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Düzenle
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleDelete}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all"
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
                >
                  Kaydet
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all"
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

export default AlisFaturasiDetail;
