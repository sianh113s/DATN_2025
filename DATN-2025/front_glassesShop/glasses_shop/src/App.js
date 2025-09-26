import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux_setup/store";
import Footer from "./shared/components/layout/Footer";
import Header from "./shared/components/layout/Header";
import Service from "./shared/components/layout/Service";
import Slider from "./shared/components/layout/Slider";
import Home from "./shared/components/pages/Home";
import Category from "./shared/components/pages/Category";
import ProductDetail from "./shared/components/pages/ProductDetail";
import Search from "./shared/components/pages/Search";
import Login from "./shared/components/pages/Login";
import Register from "./shared/components/pages/Register";
import Profile from "./shared/components/pages/Profile";
import Cart from "./shared/components/pages/Cart";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Slider />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Category/:id" element={<Category />} />
          <Route path="/ProductDetail/:id" element={<ProductDetail />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
        <Service />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
