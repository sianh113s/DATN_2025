import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./shared/components/layout/Footer";
import Header from "./shared/components/layout/Header";
import Service from "./shared/components/layout/Service";
import Slider from "./shared/components/layout/Slider";
import Home from "./shared/components/pages/Home";
import Category from "./shared/components/pages/Category";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Slider />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Category/:id" element={<Category />} />
      </Routes>
      <Service />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
