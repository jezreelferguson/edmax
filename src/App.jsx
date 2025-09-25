// import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import Contact from "./pages/Contact";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/auth/Profile";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Admin from "./pages/admin/Admin";
import Index from "./pages/admin/dashboard/Index";
import Sidebar from "./pages/admin/dashboard/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import View from "./pages/admin/CRUD_Table/View";
import Create from "./pages/admin/CRUD_Table/Create";
import Edit from "./pages/admin/CRUD_Table/Edit";
import { CartProvider } from "./contexts/CartContext";

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/view") ||
    location.pathname.startsWith("/sidebar");

  return (
    <CartProvider>
      {/* Only show Header if not on admin routes */}
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/view" element={<View />} />
        <Route
          path="/admin/crud/view"
          element={
            <ProtectedRoute>
              <View />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/crud/create"
          element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/crud/edit/:id"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
