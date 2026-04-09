import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";

import Welcome from "./kiosk/pages/Welcome";
import Categories from "./kiosk/pages/Categories";
import Products from "./kiosk/pages/Products";
import Cart from "./kiosk/pages/Cart";
import Checkout from "./kiosk/pages/Checkout";
import Success from "./kiosk/pages/Success";
import Orders from "./admin/pages/Orders";
import Dashboard from "./admin/pages/Dashboard";
import KitchenDisplay from "./admin/pages/KitchenDisplay";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />

        <Route path="/kiosk" element={<Welcome />} />
        <Route path="/kiosk/categories" element={<Categories />} />
        <Route path="/kiosk/products/:categoryId" element={<Products />} />
        <Route path="/kiosk/cart" element={<Cart />} />
        <Route path="/kiosk/checkout" element={<Checkout />} />
        <Route path="/kiosk/success" element={<Success />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/kitchen" element={<KitchenDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}
