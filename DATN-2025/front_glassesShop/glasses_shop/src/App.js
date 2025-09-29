import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux_setup/store";
import { PersistGate } from "redux-persist/integration/react";

// Layout User
import Footer from "./shared/components/layout/Footer";
import Header from "./shared/components/layout/Header";
import Service from "./shared/components/layout/Service";
import Slider from "./shared/components/layout/Slider";

// Pages User
import Home from "./shared/components/pages/Home";
import Category from "./shared/components/pages/Category";
import ProductDetail from "./shared/components/pages/ProductDetail";
import Search from "./shared/components/pages/Search";
import Login from "./shared/components/pages/Login";
import Register from "./shared/components/pages/Register";
import Profile from "./shared/components/pages/Profile";
import Cart from "./shared/components/pages/Cart";
import Payment from "./shared/components/pages/payment";

// Pages Admin
import DashBoard from "./shared/components/pages/Admin/DashBoard";

//  Layout wrapper: tách riêng admin và user
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    // Nếu là admin thì không render Header, Footer, Slider, Service
    return <>{children}</>;
  }

  // Nếu là user thì render layout user
  return (
    <>
      <Header />
      <Slider />
      {children}
      <Service />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <LayoutWrapper>
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/Category/:id" element={<Category />} />
              <Route path="/ProductDetail/:id" element={<ProductDetail />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Profile/:id" element={<Profile />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Payment" element={<Payment />} />

              {/* Admin Routes */}
              <Route path="/admin/DashBoard" element={<DashBoard />} />

            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
