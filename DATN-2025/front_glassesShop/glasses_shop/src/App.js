import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./shared/components/layout/Footer";
import Header from "./shared/components/layout/Header";
import Service from "./shared/components/layout/Service";
import Slider from "./shared/components/layout/Slider";
import Home from "./shared/components/Home";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <div className="preloader-wrapper">
            <div className="preloader">
            </div>
          </div>
          <Header />
          <Slider />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Service />
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
