import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, LogOut, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function VerticalNavbar() {
  const [stokOpen, setStokOpen] = useState(false);
  const [teklifOpen, setTeklifOpen] = useState(false);
  const [finansOpen, setFinansOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false); // Close mobile sidebar on link click
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#1a1f2e] text-white px-4 py-3 flex justify-start items-start shadow-lg sticky top-0 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Menüyü Kapat" : "Menüyü Aç"}
          className="p-2 rounded-md hover:bg-[#2f3747]/50"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-screen w-[75%] max-w-[280px] bg-gradient-to-b from-[#1a1f2e] to-[#252e3b] p-6 z-50 shadow-2xl md:hidden flex flex-col"
          >
            <SidebarContent
              stokOpen={stokOpen}
              setStokOpen={setStokOpen}
              teklifOpen={teklifOpen}
              setTeklifOpen={setTeklifOpen}
              finansOpen={finansOpen}
              setFinansOpen={setFinansOpen}
              handleLinkClick={handleLinkClick}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-64 bg-gray-900 p-6 fixed border-r border-gray-700/30 shadow-lg">
        <SidebarContent
          stokOpen={stokOpen}
          setStokOpen={setStokOpen}
          teklifOpen={teklifOpen}
          setTeklifOpen={setTeklifOpen}
          finansOpen={finansOpen}
          setFinansOpen={setFinansOpen}
          handleLinkClick={handleLinkClick}
        />
      </div>
    </>
  );
}

function SidebarContent({
  stokOpen,
  setStokOpen,
  teklifOpen,
  setTeklifOpen,
  finansOpen,
  setFinansOpen,
  handleLinkClick,
}) {
  const dropdownVariants = {
    open: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
    closed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col gap-6  text-gray-200 w-full h-full overflow-y-auto">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#616e80] to-[#2f3747]">
        Lumos 2.0
      </h1>

      <nav className="flex flex-col gap-2 text-base font-medium flex-grow">
        <Link
          to="/"
          onClick={handleLinkClick}
          className="px-3 py-2 rounded-lg hover:bg-[#2f3747]/50 hover:text-white"
        >
          Anasayfa
        </Link>
        <DropdownSection
          label="Finans Yönetimi"
          isOpen={finansOpen}
          setOpen={setFinansOpen}
          links={[
            { to: "/finans-yonetimi/cari-hesaplar", text: "Cari Hesaplar" },
            { to: "/finans-yonetimi/alis-faturalari", text: "Alış Faturaları" },
            {
              to: "/finans-yonetimi/satis-faturalari",
              text: "Satış Faturaları",
            },
            { to: "/finans-yonetimi/odemeler", text: "Ödemeler" },
          ]}
          handleLinkClick={handleLinkClick}
          dropdownVariants={dropdownVariants}
        />

        <DropdownSection
          label="Stok Yönetimi"
          isOpen={stokOpen}
          setOpen={setStokOpen}
          links={[
            { to: "/stok-yonetimi/stok-kartlari", text: "Stok Kartları" },
            { to: "/urun-yonetimi/urunler", text: "Ürün Kartları" },
          ]}
          handleLinkClick={handleLinkClick}
          dropdownVariants={dropdownVariants}
        />
        <DropdownSection
          label="Teklif Yönetimi"
          isOpen={teklifOpen}
          setOpen={setTeklifOpen}
          links={[
            { to: "/teklif-yonetimi/icmal-olustur", text: "İcmal Oluştur" },
          ]}
          handleLinkClick={handleLinkClick}
          dropdownVariants={dropdownVariants}
        />

        <Link
          to="/ayarlar"
          onClick={handleLinkClick}
          className="px-3 py-2 rounded-lg hover:bg-[#2f3747]/50"
        >
          Ayarlar
        </Link>
      </nav>

      <div className="flex flex-col gap-2 mt-auto">
        <Link
          to="/profil"
          onClick={handleLinkClick}
          className="flex items-center px-3 py-2 hover:text-white"
        >
          <User size={18} className="mr-2" />
          Merhaba Batıkan!
        </Link>
        <button
          onClick={handleLinkClick}
          className="flex items-center px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg"
        >
          <LogOut size={18} className="mr-2" />
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}

function DropdownSection({
  label,
  isOpen,
  setOpen,
  links,
  handleLinkClick,
  dropdownVariants,
}) {
  return (
    <>
      <button
        onClick={() => setOpen(!isOpen)}
        className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-[#2f3747]/50 cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={`dropdown-${label}`}
      >
        <span>{label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`dropdown-${label}`}
            className="ml-4 flex flex-col gap-1 overflow-hidden"
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {links.map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                onClick={handleLinkClick}
                className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-[#2f3747]/30 rounded-md"
              >
                {link.text}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default VerticalNavbar;
