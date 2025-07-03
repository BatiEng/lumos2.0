import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    scale: 1.05,
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

function AddCariCard() {
  const [formData, setFormData] = useState({
    unvan: "",
    yetkiliAd: "",
    telefon: "",
    email: "",
    adres: "",
    vergiNo: "",
    vergiDairesi: "",
    bakiye: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cari Kart Eklendi:", formData);
    // Submit logic here
  };

  const handleReset = () => {
    setFormData({
      unvan: "",
      yetkiliAd: "",
      telefon: "",
      email: "",
      adres: "",
      vergiNo: "",
      vergiDairesi: "",
      bakiye: "",
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm mt-6 text-gray-800"
    >
      <h2 className="text-2xl font-semibold mb-6">Yeni Cari Kart Ekle</h2>
      <form
        className="grid gap-4 grid-cols-1 md:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Ünvan"
          name="unvan"
          value={formData.unvan}
          onChange={handleChange}
          required
        />
        <InputField
          label="Yetkili Adı"
          name="yetkiliAd"
          value={formData.yetkiliAd}
          onChange={handleChange}
        />
        <InputField
          label="Telefon"
          name="telefon"
          value={formData.telefon}
          onChange={handleChange}
        />
        <InputField
          label="E-posta"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Vergi No"
          name="vergiNo"
          value={formData.vergiNo}
          onChange={handleChange}
        />
        <InputField
          label="Vergi Dairesi"
          name="vergiDairesi"
          value={formData.vergiDairesi}
          onChange={handleChange}
        />
        <InputField
          label="Bakiye (₺)"
          name="bakiye"
          type="number"
          value={formData.bakiye}
          onChange={handleChange}
        />
        <TextareaField
          label="Adres"
          name="adres"
          value={formData.adres}
          onChange={handleChange}
        />

        <div className="flex gap-3 justify-end md:col-span-2 mt-4">
          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
          >
            Kaydet
          </motion.button>
          <motion.button
            type="button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleReset}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
          >
            Temizle
          </motion.button>
          <Link to={"/finans-yonetimi/cari-hesaplar"}>
            <motion.button
              type="button"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleReset}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
            >
              Geri Dön
            </motion.button>
          </Link>
        </div>
      </form>
    </motion.div>
  );
}

function InputField({ label, name, value, onChange, type = "text", ...props }) {
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

function TextareaField({ label, name, value, onChange }) {
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

export default AddCariCard;
