import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const childVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Kahraman Alanı */}
      <motion.section
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="max-w-6xl mx-auto pt-16 pb-12 px-6 text-center"
      >
        <motion.h1
          variants={childVariants}
          className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4"
        >
          Lumos 2.0 ile Tanışın
        </motion.h1>
        <motion.p
          variants={childVariants}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Yepyeni stok yönetim sistemiyle tanışın. Stoklarınızı yönetin, iş
          akışlarınızı optimize edin ve verimliliği ışığa çıkarın.
        </motion.p>
        <motion.div variants={childVariants}>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="relative bg-gray-600 text-white px-6 py-3 rounded-lg text-sm font-medium overflow-hidden group"
          >
            <span className="relative z-10">Başlayın</span>
            <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Özellikler */}
      <motion.section
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="max-w-6xl mx-auto py-12 px-6"
      >
        <motion.h2
          variants={childVariants}
          className="text-3xl font-semibold text-gray-700 mb-8 text-center"
        >
          Neden Lumos 2.0?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            variants={childVariants}
            className="p-6 bg-gray-50 border border-gray-200/50 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Gerçek Zamanlı Stok Takibi
            </h3>
            <p className="text-gray-600">
              Tüm depolarınızda anlık güncellemelerle stok seviyelerini kolayca
              takip edin.
            </p>
          </motion.div>
          <motion.div
            variants={childVariants}
            className="p-6 bg-gray-50 border border-gray-200/50 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Akıllı Bildirimler
            </h3>
            <p className="text-gray-600">
              Stoklar belirlediğiniz seviyenin altına düştüğünde anında
              bilgilendirme alın.
            </p>
          </motion.div>
          <motion.div
            variants={childVariants}
            className="p-6 bg-gray-50 border border-gray-200/50 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Tedarikçi Entegrasyonu
            </h3>
            <p className="text-gray-600">
              Aranabilir veritabanı sayesinde tedarikçilerinizi kolayca yönetin
              ve seçin.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="max-w-6xl mx-auto py-12 px-6 text-center"
      >
        <motion.h2
          variants={childVariants}
          className="text-3xl font-semibold text-gray-700 mb-4"
        >
          Stok Yönetiminizi Dönüştürmeye Hazır mısınız?
        </motion.h2>
        <motion.p
          variants={childVariants}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Binlerce işletme gibi Lumos 2.0’ı kullanarak stok yönetimini
          kolaylaştırın.
        </motion.p>
        <motion.div variants={childVariants}>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="relative bg-gray-600 text-white px-6 py-3 rounded-lg text-sm font-medium overflow-hidden group"
          >
            <span className="relative z-10">Hemen Deneyin</span>
            <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default HomePage;
