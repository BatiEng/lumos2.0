import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";

// Mock data for products
const mockProducts = [
  {
    id: 1,
    stokKodu: "PRD-1001",
    urunIsmi: "Widget Alpha",
    urunAdedi: 50,
  },
  {
    id: 2,
    stokKodu: "PRD-1002",
    urunIsmi: "Gadget Beta",
    urunAdedi: 30,
  },
  {
    id: 3,
    stokKodu: "PRD-1003",
    urunIsmi: "Tool Gamma",
    urunAdedi: 20,
  },
];

// Animation variants
const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
  },
};

function Products() {
  const [search, setSearch] = useState("");

  const handleUretimeGonder = (stokKodu) => {
    console.log(`Üretime Gönder clicked for product: ${stokKodu}`);
  };

  const filteredProducts = mockProducts.filter((product) =>
    product.urunIsmi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-700">Ürünler</h2>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Ürün ismi ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full md:w-64"
          />
          <Link
            to="/urun-yonetimi/urun-ekle"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition text-center"
          >
            Ürün Ekle
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200/50 rounded-xl shadow-sm p-4">
        {/* Header */}
        <div className="hidden md:flex items-center justify-between p-4 bg-gray-200/50 rounded-lg text-sm font-medium text-gray-600 mb-2">
          <div className="w-12">Sıra</div>
          <div className="w-40">Stok Kodu</div>
          <div className="w-64">Ürün İsmi</div>
          <div className="w-24 text-center">Miktar</div>
          <div className="w-32 text-center">Aksiyon</div>
        </div>

        {/* Product List */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductItem
              key={product.id}
              row={index + 1}
              stokKodu={product.stokKodu}
              urunIsmi={product.urunIsmi}
              urunAdedi={product.urunAdedi}
              onUretimeGonder={() => handleUretimeGonder(product.stokKodu)}
            />
          ))
        ) : (
          <div className="text-center text-sm text-gray-500 py-8">
            Aradığınız isimde ürün bulunamadı.
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Products;
