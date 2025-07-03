import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

function AddSatisFatura() {
  const [formData, setFormData] = useState({
    unvan: "",
    faturaNo: "",
    faturaTarihi: "",
    faturaTutari: "",
    aciklama: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Alış Faturası:", formData);
    // Save logic here...
    navigate("/alis-faturalari");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg p-8 mt-10 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Satış Faturası Oluştur
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        <Input
          label="Ünvan"
          name="unvan"
          value={formData.unvan}
          onChange={handleChange}
        />
        <Input
          label="Fatura No"
          name="faturaNo"
          value={formData.faturaNo}
          onChange={handleChange}
        />
        <Input
          label="Fatura Tarihi"
          name="faturaTarihi"
          type="date"
          value={formData.faturaTarihi}
          onChange={handleChange}
        />
        <Input
          label="Fatura Tutarı (₺)"
          name="faturaTutari"
          type="number"
          value={formData.faturaTutari}
          onChange={handleChange}
        />
        <Textarea
          label="Açıklama"
          name="aciklama"
          value={formData.aciklama}
          onChange={handleChange}
        />
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-all"
        >
          Kaydet
        </motion.button>
      </form>
    </motion.div>
  );
}

function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="p-3 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="p-3 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default AddSatisFatura;
