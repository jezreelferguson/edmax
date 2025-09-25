import React from "react";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useCart } from "../../contexts/CartContext";
import "/public/template/NiceShop/assets/vendor/bootstrap/css/bootstrap.min.css";
import "/public/template/NiceShop/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "/public/template/NiceShop/assets/css/main.css";
import '../../assets/css/header.css'

function Header() {
    const [data, setData] = useState([]);
    const { cartCount } = useCart();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // // Check if token exists
      // if (!token) {
      //   Swal.fire({
      //     toast: true,
      //     title: "Authentication Required",
      //     text: "Please login to access this page",
      //     icon: "warning",
      //     timer: 3000,
      //     showConfirmButton: false,
      //   });
      //   // setLoader(false);
      //   return;
      // }

      const res = await api.get("/me", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(`${res.data.user.name} `);
      console.log("Api Res:", res.data.user);
    //   if (res.data.code === 200) {
    //     Swal.fire({
    //       // toast: true,
    //       title: "User",
    //       text: `Welcome ${res.data.user.name} To Edmax` ,
    //       icon: "success",
    //       timer: 2000,
    //       showConfirmButton: false,
    //     });
    //   } else {
    //     Swal.fire({
    //       toast: true,
    //       title: "Error",
    //       text: "Try Again",
    //       icon: "error",
    //       timer: 2000,
    //     });
    //   }
    // } catch (err) {
    //   console.log("Error:", JSON.stringify(err, null, 2));

    //   // Handle specific error cases
    //   if (err.response?.status === 401) {
    //     Swal.fire({
    //       toast: true,
    //       title: "Session Expired",
    //       text: "Please login again",
    //       icon: "error",
    //       timer: 3000,
    //       showConfirmButton: false,
    //     });
    //     // Clear invalid token
    //     localStorage.removeItem("token");
    //   } else {
    //     Swal.fire({
    //       toast: true,
    //       title: "Error",
    //       text: "Failed to fetch user data",
    //       icon: "error",
    //       timer: 3000,
    //       showConfirmButton: false,
    //     });
    //   }
    } finally {
      // setLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <header id="header" className="header sticky-top">
      {/* Top Bar */}
      <div className="top-bar py-2">
        <div className="container-fluid container-xl">
          <div className="row align-items-center">
            <div className="col-lg-4 d-none d-lg-flex">
              <div className="top-bar-item">
                <i className="bi bi-telephone-fill me-2"></i>
                <span>Need help? Call us: </span>
                <a href="tel:+223 247886217">:+223 247886217</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 text-center">
              <div className="announcement-slider swiper init-swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    🚚 Free Accra delivery over GH₵200
                  </div>
                  <div className="swiper-slide">
                    💰 30 days money back guarantee.
                  </div>
                  <div className="swiper-slide">
                    🎁 20% off on your first order
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-4 d-none d-lg-block">
              <div className="d-flex justify-content-end">
                <div className="top-bar-item dropdown me-3">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-translate me-2"></i>EN
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bi bi-check2 me-2 selected-icon"></i>
                        English
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Español
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Français
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Deutsch
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="top-bar-item dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-currency-dollar me-2"></i>USD
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bi bi-check2 me-2 selected-icon"></i>USD
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        EUR
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        GBP
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container-fluid container-xl">
          <div className="d-flex py-3 align-items-center justify-content-between">
            {/* Logo */}
            <Link to={"/"} className="logo d-flex align-items-center">
            <img src="src/assets/EDMAX.png" className="logo2" alt=""/>
              <h1 className="sitename fs-2">edmax</h1>

            </Link>
            {/* Search */}
            <form className="search-form desktop-search-form">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                />
                <button className="btn" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
            {/* Actions */}
            <div className="header-actions d-flex align-items-center justify-content-end">
              <button
                className="header-action-btn mobile-search-toggle d-xl-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobileSearch"
                aria-expanded="false"
                aria-controls="mobileSearch"
              >
                <i className="bi bi-search"></i>
              </button>
              <div className="dropdown account-dropdown">
                <button className="header-action-btn" data-bs-toggle="dropdown">
                  <i className="bi bi-person"></i> 
                  {data} 
                </button>
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <h6>
                      Welcome to <span className="sitename">Edmax</span>
                    </h6>
                    <p className="mb-0">Access account &amp; manage orders</p>
                  </div>
                  <div className="dropdown-body">
                    <Link to={'/profile'}
                      className="dropdown-item d-flex align-items-center"
                      href="account.html"
                    >
                      <i className="bi bi-person-circle me-2"></i>
                      <span>My Profile</span>
                    </Link>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="account.html"
                    >
                      <i className="bi bi-bag-check me-2"></i>
                      <span> My Orders</span>
                    </a>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to={'/cart'}
                    >
                      <i className="bi bi-cart3"></i>
                      <span> My Cart</span>
                    </Link>
                    {/* <a
                      className="dropdown-item d-flex align-items-center"
                      href="account.html"
                    >
                      <i className="bi bi-gear me-2"></i>
                      <span>Settings</span>
                    </a> */}
                  </div>
                  <div className="dropdown-footer">
                    <Link
                      to={'/signin'}
                      className="btn btn-primary w-100 mb-2"
                    >
                      Sign In
                    </Link>
                    <Link
                      to={'/signup'}
                      className="btn btn-outline-primary w-100"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>
              {/* <a
                href="account.html"
                className="header-action-btn d-none d-md-block"
              >
                <i className="bi bi-heart"></i>
                <span className="badge">0</span>
              </a> */}
              <Link to={'/cart'} className="header-action-btn">
                <i className="bi bi-cart3"></i>
                <span className="badge cart-badge">{cartCount}</span>
              </Link>
              <i className="mobile-nav-toggle d-xl-none bi bi-list me-0"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="header-nav">
        <div className="container-fluid container-xl position-relative">
          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <Link to={"/"} className="active">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={'/product'} >Products</Link>
              </li>
              {/* <li>
                <a href="product-details.html">Category</a>
              </li> */}
              <li>
                <Link to={'/cart'}>Cart</Link>
              </li>
              {/* <li>
                <a href="checkout.html">Checkout</a>
              </li> */}
              <li className="dropdown">
                {/* <a href="#">
                  <span>Dropdown</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a> */}
                <ul>
                  <li>
                    <a href="#">Dropdown 1</a>
                  </li>
                  <li className="dropdown">
                    <a href="#">
                      <span>Deep Dropdown</span>{" "}
                      <i className="bi bi-chevron-down toggle-dropdown"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">Dropdown 2</a>
                  </li>
                  <li>
                    <a href="#">Dropdown 3</a>
                  </li>
                  <li>
                    <a href="#">Dropdown 4</a>
                  </li>
                </ul>
              </li>
              {/* <li className="products-megamenu-1">
                <a href="#">
                  <span>Megamenu 1</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
              </li> */}
              {/* <li className="products-megamenu-2">
                <a href="#">
                  <span>Megamenu 2</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
              </li> */}
              <li>
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Search Form */}
      <div className="collapse" id="mobileSearch">
        <div className="container">
          <form className="search-form">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for products"
              />
              <button className="btn" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
