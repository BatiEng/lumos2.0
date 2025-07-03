import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VerticalNavbar from "./components/VerticalNavbar";
import PathBreadcrumb from "./components/PathBreadcrumb";
import StockCards from "./pages/StockCards";
import AddStockCard from "./pages/AddStockCard";
import StockDetail from "./pages/StockDetail";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ProductDetail from "./pages/ProductDetail";
import CariCards from "./pages/CariCards";
import AddCariCard from "./pages/AddCariCard";
import CariCardDetail from "./pages/CariCardDetail";
import AlisFaturalari from "./pages/AlisFaturalari";
import SatisFaturalari from "./pages/SatisFaturalari";
import AddAlisFatura from "./pages/AddAlisFatura";
import AddSatisFatura from "./pages/AddSatisFatura";
import Payments from "./pages/Payments";
import PaymentDetail from "./pages/PaymentDetail";
import AlisFaturasiDetail from "./pages/AlisFaturasiDetail";

function App() {
  return (
    <div className="flex">
      <VerticalNavbar />

      {/* Sayfa içeriği */}
      <div className="md:ml-64 w-full p-6">
        {/* Her sayfanın üstünde breadcrumb */}
        <PathBreadcrumb />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stok-yonetimi/stok-kartlari" element={<StockCards />} />
          <Route path="/stok-yonetimi/stok-ekle" element={<AddStockCard />} />
          <Route path="/urun-yonetimi/urunler" element={<Products />} />
          <Route path="/urun-yonetimi/urun-ekle" element={<AddProduct />} />
          <Route
            path="/stok-yonetimi/stok-kartlari/:id"
            element={<StockDetail />}
          />
          <Route
            path="/urun-yonetimi/urunler/:id"
            element={<ProductDetail />}
          />
          <Route
            path="/finans-yonetimi/cari-hesaplar"
            element={<CariCards />}
          />
          <Route
            path="/finans-yonetimi/cari-hesaplar/:id"
            element={<CariCardDetail />}
          />
          <Route
            path="/finans-yonetimi/cari-hesap-ekle"
            element={<AddCariCard />}
          />
          <Route
            path="/finans-yonetimi/alis-faturalari"
            element={<AlisFaturalari />}
          />
          <Route
            path="/finans-yonetimi/alis-faturalari/:id"
            element={<AlisFaturasiDetail />}
          />
          <Route
            path="/finans-yonetimi/alis-faturalari/alis-faturasi-ekle"
            element={<AddAlisFatura />}
          />
          <Route
            path="/finans-yonetimi/satis-faturalari"
            element={<SatisFaturalari />}
          />
          <Route
            path="/finans-yonetimi/satis-faturalari/satis-faturasi-ekle"
            element={<AddSatisFatura />}
          />
          <Route path="/finans-yonetimi/odemeler" element={<Payments />} />
          <Route
            path="/finans-yonetimi/odemeler/:id"
            element={<PaymentDetail />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
