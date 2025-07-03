import { motion } from "framer-motion";
import PaymentItem from "../components/PaymentItem";

const dummyPayments = [
  {
    id: 1,
    cari: "ABC Elektrik",
    tarih: "2025-07-03",
    odemeSekli: "Nakit",
    tutar: 1200,
  },
  {
    id: 2,
    cari: "XYZ Teknoloji",
    tarih: "2025-06-28",
    odemeSekli: "Havale",
    tutar: 3400.5,
  },
];

const Payments = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-6 py-10"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ödemeler</h2>
      <div className="space-y-4">
        {dummyPayments.map((p) => (
          <PaymentItem key={p.id} {...p} />
        ))}
      </div>
    </motion.div>
  );
};

export default Payments;
