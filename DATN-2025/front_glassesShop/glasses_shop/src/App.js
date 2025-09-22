import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./shared/components/layout/Footer";
import Header from "./shared/components/layout/Header";
import Service from "./shared/components/layout/Service";
import Slider from "./shared/components/layout/Slider";
import Home from "./shared/components/pages/Home";
import Category from "./shared/components/pages/Category";
import ProductDetail from "./shared/components/pages/ProductDetail";
import Search from "./shared/components/pages/Search";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Slider />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Category/:id" element={<Category />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
      <Service />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
