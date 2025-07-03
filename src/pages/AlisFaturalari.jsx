import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import FaturaItem from "../components/FaturaItem";

// Mock invoice data
const mockFaturas = [
  {
    id: 1,
    unvan: "Tech Suppliers Ltd.",
    faturaTarihi: "2025-06-15",
    faturaTutari: 12500.5,
    faturaNo: "INV-2025-001",
  },
  {
    id: 2,
    unvan: "Global Elektronik A.Ş.",
    faturaTarihi: "2025-06-10",
    faturaTutari: 8750.25,
    faturaNo: "INV-2025-002",
  },
  {
    id: 3,
    unvan: "Yıldız Malzeme Sanayi",
    faturaTarihi: "2025-06-05",
    faturaTutari: 4300.75,
    faturaNo: "INV-2025-003",
  },
  {
    id: 4,
    unvan: "Akım Teknoloji",
    faturaTarihi: "2025-05-28",
    faturaTutari: 19250.0,
    faturaNo: "INV-2025-004",
  },
  {
    id: 5,
    unvan: "Güven Tedarik",
    faturaTarihi: "2025-05-20",
    faturaTutari: 6700.3,
    faturaNo: "INV-2025-005",
  },
];

const containerVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  tap: { scale: 0.98 },
};

const AlisFaturalari = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-4">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="max-w-6xl mx-auto p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Alış Faturaları
          </h2>
          <Link to="/finans-yonetimi/alis-faturalari/alis-faturasi-ekle">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Yeni Fatura Ekle
            </motion.button>
          </Link>
        </div>
        <div className="space-y-4">
          <AnimatePresence>
            {mockFaturas.length > 0 ? (
              mockFaturas.map((fatura) => (
                <FaturaItem
                  key={fatura.id}
                  id={fatura.id}
                  unvan={fatura.unvan}
                  faturaTarihi={fatura.faturaTarihi}
                  faturaTutari={fatura.faturaTutari}
                  faturaNo={fatura.faturaNo}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 text-lg"
              >
                Fatura bulunamadı.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AlisFaturalari;
