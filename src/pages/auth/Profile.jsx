import React from 'react'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../../public/api/api';

function Profile() {
      const [data, setData] = useState([]);
     const [loader, setLoader] = useState(true);
      
    
     const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          
          // Check if token exists
          if (!token) {
            Swal.fire({
              toast: true,
              title: "Authentication Required",
              text: "Please login to access this page",
              icon: "warning",
              timer: 3000,
              showConfirmButton: false
            });
            setLoader(false);
            return;
          }
    
          const res = await api.get("/me", {
            headers: {
               Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setData(`${res.data.user.name} `);
          console.log("Api Res:", res.data.user);
          // if (res.data.code === 200) {
          //   Swal.fire({
          //     toast: true,
          //     title: "User",
          //     text: `Welcome ${res.data.user.name}`,
          //     icon: "success",
          //     timer: 2000,
          //     showConfirmButton: false
          //   });
          // } else {
          //   Swal.fire({
          //     toast: true,
          //     title: "Error",
          //     text: "Try Again",
          //     icon: "error",
          //     timer: 2000,
          //   });
          // }
        } catch (err) {
          console.log('Error:',JSON.stringify(err, null, 2));
          
          // Handle specific error cases
          if (err.response?.status === 401) {
            Swal.fire({
              toast: true,
              title: "Session Expired",
              text: "Please login again",
              icon: "error",
              timer: 3000,
              showConfirmButton: false
            });
            // Clear invalid token
            localStorage.removeItem("token");
          } else {
            Swal.fire({
              toast: true,
              title: "Error",
              text: "Failed to fetch user data",
              icon: "error",
              timer: 3000,
              showConfirmButton: false
            });
          }
        } finally {
          setLoader(false);
        }
      };
      useEffect(()=>{
        fetchData();
      },[])
  return (
    <>
      <main className="main">
    <div className="page-title light-background">
      <div className="container d-lg-flex justify-content-between align-items-center">
        <h1 className="mb-2 mb-lg-0">Account</h1>
        <nav className="breadcrumbs">
          <ol>
            <li><a href="index.html">Home</a></li>
            <li className="current">Account</li>
          </ol>
        </nav>
      </div>
    </div>

   
    <section id="account" className="account section">

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        
        <div className="mobile-menu d-lg-none mb-4">
          <button className="mobile-menu-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#profileMenu">
            <i className="bi bi-grid"></i>
            <span>Menu</span>
          </button>
        </div>

        <div className="row g-4">
          <div className="col-lg-3">
            <div className="profile-menu collapse d-lg-block" id="profileMenu">
              <div className="user-info" data-aos="fade-right">
                <div className="user-avatar">
                  <img src="src/assets/images/products/placeholder-user.jpg" alt="Profile" loading="lazy"/>
                  <span className="status-badge"><i className="bi bi-shield-check"></i></span>
                </div>
                <h4>{data}</h4>
                <div className="user-status">
                  <i className="bi bi-user"></i>
                  <span>User</span>
                </div>
              </div>

              <nav className="menu-nav">
                <ul className="nav flex-column" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" href="#orders">
                      <i className="bi bi-box-seam"></i>
                      <span>My Orders</span>
                      <span className="badge">3</span>
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#wishlist">
                      <i className="bi bi-heart"></i>
                      <span>Wishlist</span>
                      <span className="badge">12</span>
                    </a>
                  </li> */}
                  {/* <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#wallet">
                      <i className="bi bi-wallet2"></i>
                      <span>Payment Methods</span>
                    </a>
                  </li> */}
                  {/* <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#reviews">
                      <i className="bi bi-star"></i>
                      <span>My Reviews</span>
                    </a>
                  </li> */}
                  {/* <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#addresses">
                      <i className="bi bi-geo-alt"></i>
                      <span>Addresses</span>
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#settings">
                      <i className="bi bi-gear"></i>
                      <span>Account Settings</span>
                    </a>
                  </li>
                </ul>

                <div className="menu-footer">
                  {/* <a href="#" className="help-link">
                    <i className="bi bi-question-circle"></i>
                    <span>Help Center</span>
                  </a> */}
                  <a href="#" className="logout-link">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Log Out</span>
                  </a>
                </div>
              </nav>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="content-area">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="orders">
                  <div className="section-header" data-aos="fade-up">
                    <h2>My Orders</h2>
                    <div className="header-actions">
                      <div className="search-box">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder="Search orders..."/>
                      </div>
                      <div className="dropdown">
                        <button className="filter-btn" data-bs-toggle="dropdown">
                          <i className="bi bi-funnel"></i>
                          <span>Filter</span>
                        </button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">All Orders</a></li>
                          <li><a className="dropdown-item" href="#">Processing</a></li>
                          <li><a className="dropdown-item" href="#">Shipped</a></li>
                          <li><a className="dropdown-item" href="#">Delivered</a></li>
                          <li><a className="dropdown-item" href="#">Cancelled</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="orders-grid">
                    <div className="order-card" data-aos="fade-up" data-aos-delay="100">
                      <div className="order-header">
                        <div className="order-id">
                          <span className="label">Order ID:</span>
                          <span className="value">#ORD-2024-1278</span>
                        </div>
                        <div className="order-date">Feb 20, 2025</div>
                      </div>
                      <div className="order-content">
                        <div className="product-grid">
                          <img src="assets/img/product/product-1.webp" alt="Product" loading="lazy"/>
                          <img src="assets/img/product/product-2.webp" alt="Product" loading="lazy"/>
                          <img src="assets/img/product/product-3.webp" alt="Product" loading="lazy"/>
                        </div>
                        <div className="order-info">
                          <div className="info-row">
                            <span>Status</span>
                            <span className="status processing">Processing</span>
                          </div>
                          <div className="info-row">
                            <span>Items</span>
                            <span>3 items</span>
                          </div>
                          <div className="info-row">
                            <span>Total</span>
                            <span className="price">$789.99</span>
                          </div>
                        </div>
                      </div>
                      <div className="order-footer">
                        <button type="button" className="btn-track" data-bs-toggle="collapse" data-bs-target="#tracking1" aria-expanded="false">Track Order</button>
                        <button type="button" className="btn-details" data-bs-toggle="collapse" data-bs-target="#details1" aria-expanded="false">View Details</button>
                      </div>

                      <div className="collapse tracking-info" id="tracking1">
                        <div className="tracking-timeline">
                          <div className="timeline-item completed">
                            <div className="timeline-icon">
                              <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <div className="timeline-content">
                              <h5>Order Confirmed</h5>
                              <p>Your order has been received and confirmed</p>
                              <span className="timeline-date">Feb 20, 2025 - 10:30 AM</span>
                            </div>
                          </div>

                          <div className="timeline-item completed">
                            <div className="timeline-icon">
                              <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <div className="timeline-content">
                              <h5>Processing</h5>
                              <p>Your order is being prepared for shipment</p>
                              <span className="timeline-date">Feb 20, 2025 - 2:45 PM</span>
                            </div>
                          </div>

                          <div className="timeline-item active">
                            <div className="timeline-icon">
                              <i className="bi bi-box-seam"></i>
                            </div>
                            <div className="timeline-content">
                              <h5>Packaging</h5>
                              <p>Your items are being packaged for shipping</p>
                              <span className="timeline-date">Feb 20, 2025 - 4:15 PM</span>
                            </div>
                          </div>

                          <div className="timeline-item">
                            <div className="timeline-icon">
                              <i className="bi bi-truck"></i>
                            </div>
                            <div className="timeline-content">
                              <h5>In Transit</h5>
                              <p>Expected to ship within 24 hours</p>
                            </div>
                          </div>

                          <div className="timeline-item">
                            <div className="timeline-icon">
                              <i className="bi bi-house-door"></i>
                            </div>
                            <div className="timeline-content">
                              <h5>Delivery</h5>
                              <p>Estimated delivery: Feb 22, 2025</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="collapse order-details" id="details1">
                        <div className="details-content">
                          <div className="detail-section">
                            <h5>Order Information</h5>
                            <div className="info-grid">
                              <div className="info-item">
                                <span className="label">Payment Method</span>
                                <span className="value">Credit Card (**** 4589)</span>
                              </div>
                              <div className="info-item">
                                <span className="label">Shipping Method</span>
                                <span className="value">Express Delivery (2-3 days)</span>
                              </div>
                            </div>
                          </div>

                          <div className="detail-section">
                            <h5>Items (3)</h5>
                            <div className="order-items">
                              <div className="item">
                                <img src="assets/img/product/product-1.webp" alt="Product" loading="lazy"/>
                                <div className="item-info">
                                  <h6>Lorem ipsum dolor sit amet</h6>
                                  <div className="item-meta">
                                    <span className="sku">SKU: PRD-001</span>
                                    <span className="qty">Qty: 1</span>
                                  </div>
                                </div>
                                <div className="item-price">$899.99</div>
                              </div>

                              <div className="item">
                                <img src="assets/img/product/product-2.webp" alt="Product" loading="lazy"/>
                                <div className="item-info">
                                  <h6>Consectetur adipiscing elit</h6>
                                  <div className="item-meta">
                                    <span className="sku">SKU: PRD-002</span>
                                    <span className="qty">Qty: 2</span>
                                  </div>
                                </div>
                                <div className="item-price">$599.95</div>
                              </div>

                              <div className="item">
                                <img src="assets/img/product/product-3.webp" alt="Product" loading="lazy"/>
                                <div className="item-info">
                                  <h6>Sed do eiusmod tempor</h6>
                                  <div className="item-meta">
                                    <span className="sku">SKU: PRD-003</span>
                                    <span className="qty">Qty: 1</span>
                                  </div>
                                </div>
                                <div className="item-price">$129.99</div>
                              </div>
                            </div>
                          </div>

                          <div className="detail-section">
                            <h5>Price Details</h5>
                            <div className="price-breakdown">
                              <div className="price-row">
                                <span>Subtotal</span>
                                <span>$1,929.93</span>
                              </div>
                              <div className="price-row">
                                <span>Shipping</span>
                                <span>$15.99</span>
                              </div>
                              <div className="price-row">
                                <span>Tax</span>
                                <span>$159.98</span>
                              </div>
                              <div className="price-row total">
                                <span>Total</span>
                                <span>$2,105.90</span>
                              </div>
                            </div>
                          </div>

                          <div className="detail-section">
                            <h5>Shipping Address</h5>
                            <div className="address-info">
                              <p>Sarah Anderson<br/>123 Main Street<br/>Apt 4B<br/>New York, NY 10001<br/>United States</p>
                              <p className="contact">+1 (555) 123-4567</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="order-card" data-aos="fade-up" data-aos-delay="200">
                      <div className="order-header">
                        <div className="order-id">
                          <span className="label">Order ID:</span>
                          <span className="value">#ORD-2024-1265</span>
                        </div>
                        <div className="order-date">Feb 15, 2025</div>
                      </div>
                      <div className="order-content">
                        <div className="product-grid">
                          <img src="assets/img/product/product-4.webp" alt="Product" loading="lazy"/>
                          <img src="assets/img/product/product-5.webp" alt="Product" loading="lazy"/>
                        </div>
                        <div className="order-info">
                          <div className="info-row">
                            <span>Status</span>
                            <span className="status shipped">Shipped</span>
                          </div>
                          <div className="info-row">
                            <span>Items</span>
                            <span>2 items</span>
                          </div>
                          <div className="info-row">
                            <span>Total</span>
                            <span className="price">$459.99</span>
                          </div>
                        </div>
                      </div>
                      <div className="order-footer">
                        <button type="button" className="btn-track" data-bs-toggle="collapse" data-bs-target="#tracking2" aria-expanded="false">Track Order</button>
                        <button type="button" className="btn-details" data-bs-toggle="collapse" data-bs-target="#details2" aria-expanded="false">View Details</button>
                      </div>

                      <div className="collapse tracking-info" id="tracking2">
                        <div className="tracking-timeline">
                          <div className="timeline-item completed">
                            <div className="timeline-icon">
                              <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <div className="timeline-content">
                              <h5>Order Confirmed</h5>
                              <p>Your order has been received and confirmed</p>
                              <span className="timeline-date">Feb 15, 2025 - 9:15 AM</span>
                            </div>
                          </div>

                          <div className="timeline-item completed">
                            <div className="timeline-icon">
                              <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <div className="timeline-content">
                              <h5>Processing</h5>
                              <p>Your order is being prepared for shipment</p>
                              <span className="timeline-date">Feb 15, 2025 - 11:30 AM</span>
                            </div>
                          </div>

                          <div className="timeline-item completed">
                            <div className="timeline-icon">
                              <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <div className="timeline-content">
                              <h5>Packaging</h5>
                              <p>Your items have been packaged for shipping</p>
                              <span className="timeline-date">Feb 15, 2025 - 2:45 PM</span>
                            </div>
                          </div>

                          <div className="timeline-item active">
                            <div className="timeline-icon">
                              <i className="bi bi-truck"></i>
                            </div>
                            <div className="timeline-content">
                              <h5>In Transit</h5>
                              <p>Package in transit with carrier</p>
                              <span className="timeline-date">Feb 16, 2025 - 10:20 AM</span>
                              <div className="shipping-info">
                                <span>Tracking Number: </span>
                                <span className="tracking-number">1Z999AA1234567890</span>
                              </div>
                            </div>
                          </div>

                          <div className="timeline-item">
                            <div className="timeline-icon">
                              <i className="bi bi-house-door"></i>
                            </div>
                            <div className="timeline-content">
                              <h5>Delivery</h5>
                              <p>Estimated delivery: Feb 18, 2025</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="collapse order-details" id="details2">
                        <div className="details-content">
                          <div className="detail-section">
                            <h5>Order Information</h5>
                            <div className="info-grid">
                              <div className="info-item">
                                <span className="label">Payment Method</span>
                                <span className="value">Credit Card (**** 7821)</span>
                              </div>
                              <div className="info-item">
                                <span className="label">Shipping Method</span>
                                <span className="value">Standard Shipping (3-5 days)</span>
                              </div>
                            </div>
                          </div>

                          <div className="detail-section">
                            <h5>Items (2)</h5>
                            <div className="order-items">
                              <div className="item">
                                <img src="assets/img/product/product-4.webp" alt="Product" loading="lazy"/>
                                <div className="item-info">
                                  <h6>Ut enim ad minim veniam</h6>
                                  <div className="item-meta">
                                    <span className="sku">SKU: PRD-004</span>
                                    <span className="qty">Qty: 1</span>
                                  </div>
                                </div>
                                <div className="item-price">$299.99</div>
                              </div>

                              <div className="item">
                                <img src="assets/img/product/product-5.webp" alt="Product" loading="lazy"/>
                                <div className="item-info">
                                  <h6>Quis nostrud exercitation</h6>
                                  <div className="item-meta">
                                    <span className="sku">SKU: PRD-005</span>
                                    <span className="qty">Qty: 1</span>
                                  </div>
                                </div>
                                <div className="item-price">$159.99</div>
                              </div>
                            </div>
                          </div>

                          <div className="detail-section">
                            <h5>Price Details</h5>
                            <div className="price-breakdown">
                              <div className="price-row">
                                <span>Subtotal</span>
                                <span>$459.98</span>
                              </div>
                              <div className="price-row">
                                <span>Shipping</span>
                                <span>$9.99</span>
                              </div>
                              <div className="price-row">
                                <span>Tax</span>
                                <span>$38.02</span>
                              </div>
                              <div className="price-row total">
                                <span>Total</span>
                                <span>$459.99</span>
                              </div>
                            </div>
                          </div>

                          <div className="detail-section">
                            <h5>Shipping Address</h5>
                            <div className="address-info">
                              <p>Sarah Anderson<br/>123 Main Street<br/>Apt 4B<br/>New York, NY 10001<br/>United States</p>
                              <p className="contact">+1 (555) 123-4567</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="order-card" data-aos="fade-up" data-aos-delay="300">
                      <div className="order-header">
                        <div className="order-id">
                          <span className="label">Order ID:</span>
                          <span className="value">#ORD-2024-1252</span>
                        </div>
                        <div className="order-date">Feb 10, 2025</div>
                      </div>
                      <div className="order-content">
                        <div className="product-grid">
                          <img src="assets/img/product/product-6.webp" alt="Product" loading="lazy"/>
                        </div>
                        <div className="order-info">
                          <div className="info-row">
                            <span>Status</span>
                            <span className="status delivered">Delivered</span>
                          </div>
                          <div className="info-row">
                            <span>Items</span>
                            <span>1 item</span>
                          </div>
                          <div className="info-row">
                            <span>Total</span>
                            <span className="price">$129.99</span>
                          </div>
                        </div>
                      </div>
                      <div className="order-footer">
                        <button type="button" className="btn-review">Write Review</button>
                        <button type="button" className="btn-details">View Details</button>
                      </div>
                    </div>

                    <div className="order-card" data-aos="fade-up" data-aos-delay="400">
                      <div className="order-header">
                        <div className="order-id">
                          <span className="label">Order ID:</span>
                          <span className="value">#ORD-2024-1245</span>
                        </div>
                        <div className="order-date">Feb 5, 2025</div>
                      </div>
                      <div className="order-content">
                        <div className="product-grid">
                          <img src="assets/img/product/product-7.webp" alt="Product" loading="lazy"/>
                          <img src="assets/img/product/product-8.webp" alt="Product" loading="lazy"/>
                          <img src="assets/img/product/product-9.webp" alt="Product" loading="lazy"/>
                          <span className="more-items">+2</span>
                        </div>
                        <div className="order-info">
                          <div className="info-row">
                            <span>Status</span>
                            <span className="status cancelled">Cancelled</span>
                          </div>
                          <div className="info-row">
                            <span>Items</span>
                            <span>5 items</span>
                          </div>
                          <div className="info-row">
                            <span>Total</span>
                            <span className="price">$1,299.99</span>
                          </div>
                        </div>
                      </div>
                      <div className="order-footer">
                        <button type="button" className="btn-reorder">Reorder</button>
                        <button type="button" className="btn-details">View Details</button>
                      </div>
                    </div>
                  </div>

                  <div className="pagination-wrapper" data-aos="fade-up">
                    <button type="button" className="btn-prev" disabled="">
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <div className="page-numbers">
                      <button type="button" className="active">1</button>
                      <button type="button">2</button>
                      <button type="button">3</button>
                      <span>...</span>
                      <button type="button">12</button>
                    </div>
                    <button type="button" className="btn-next">
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>

                <div className="tab-pane fade" id="wishlist">
                  <div className="section-header" data-aos="fade-up">
                    <h2>My Wishlist</h2>
                    <div className="header-actions">
                      <button type="button" className="btn-add-all">Add All to Cart</button>
                    </div>
                  </div>

                  <div className="wishlist-grid">
                    <div className="wishlist-card" data-aos="fade-up" data-aos-delay="100">
                      <div className="wishlist-image">
                        <img src="assets/img/product/product-1.webp" alt="Product" loading="lazy"/>
                        <button className="btn-remove" type="button" aria-label="Remove from wishlist">
                          <i className="bi bi-trash"></i>
                        </button>
                        <div className="sale-badge">-20%</div>
                      </div>
                      <div className="wishlist-content">
                        <h4>Lorem ipsum dolor sit amet</h4>
                        <div className="product-meta">
                          <div className="rating">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-half"></i>
                            <span>(4.5)</span>
                          </div>
                          <div className="price">
                            <span className="current">$79.99</span>
                            <span className="original">$99.99</span>
                          </div>
                        </div>
                        <button type="button" className="btn-add-cart">Add to Cart</button>
                      </div>
                    </div>

                    <div className="wishlist-card" data-aos="fade-up" data-aos-delay="200">
                      <div className="wishlist-image">
                        <img src="assets/img/product/product-2.webp" alt="Product" loading="lazy"/>
                        <button className="btn-remove" type="button" aria-label="Remove from wishlist">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                      <div className="wishlist-content">
                        <h4>Consectetur adipiscing elit</h4>
                        <div className="product-meta">
                          <div className="rating">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star"></i>
                            <span>(4.0)</span>
                          </div>
                          <div className="price">
                            <span className="current">$149.99</span>
                          </div>
                        </div>
                        <button type="button" className="btn-add-cart">Add to Cart</button>
                      </div>
                    </div>

                 
                    <div className="wishlist-card" data-aos="fade-up" data-aos-delay="300">
                      <div className="wishlist-image">
                        <img src="assets/img/product/product-3.webp" alt="Product" loading="lazy"/>
                        <button className="btn-remove" type="button" aria-label="Remove from wishlist">
                          <i className="bi bi-trash"></i>
                        </button>
                        <div className="out-of-stock-badge">Out of Stock</div>
                      </div>
                      <div className="wishlist-content">
                        <h4>Sed do eiusmod tempor</h4>
                        <div className="product-meta">
                          <div className="rating">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <span>(5.0)</span>
                          </div>
                          <div className="price">
                            <span className="current">$199.99</span>
                          </div>
                        </div>
                        <button type="button" className="btn-notify">Notify When Available</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="wallet">
                  <div className="section-header" data-aos="fade-up">
                    <h2>Payment Methods</h2>
                    <div className="header-actions">
                      <button type="button" className="btn-add-new">
                        <i className="bi bi-plus-lg"></i>
                        Add New Card
                      </button>
                    </div>
                  </div>

                  <div className="payment-cards-grid">
                    <div className="payment-card default" data-aos="fade-up" data-aos-delay="100">
                      <div className="card-header">
                        <i className="bi bi-credit-card"></i>
                        <div className="card-badges">
                          <span className="default-badge">Default</span>
                          <span className="card-type">Visa</span>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-number">•••• •••• •••• 4589</div>
                        <div className="card-info">
                          <span>Expires 09/2026</span>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button type="button" className="btn-edit">
                          <i className="bi bi-pencil"></i>
                          Edit
                        </button>
                        <button type="button" className="btn-remove">
                          <i className="bi bi-trash"></i>
                          Remove
                        </button>
                      </div>
                    </div>

                
                    <div className="payment-card" data-aos="fade-up" data-aos-delay="200">
                      <div className="card-header">
                        <i className="bi bi-credit-card"></i>
                        <div className="card-badges">
                          <span className="card-type">Mastercard</span>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-number">•••• •••• •••• 7821</div>
                        <div className="card-info">
                          <span>Expires 05/2025</span>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button type="button" className="btn-edit">
                          <i className="bi bi-pencil"></i>
                          Edit
                        </button>
                        <button type="button" className="btn-remove">
                          <i className="bi bi-trash"></i>
                          Remove
                        </button>
                        <button type="button" className="btn-make-default">Make Default</button>
                      </div>
                    </div>
                  </div>
                </div>

            
                <div className="tab-pane fade" id="reviews">
                  <div className="section-header" data-aos="fade-up">
                    <h2>My Reviews</h2>
                    <div className="header-actions">
                      <div className="dropdown">
                        <button className="filter-btn" data-bs-toggle="dropdown">
                          <i className="bi bi-funnel"></i>
                          <span>Sort by: Recent</span>
                        </button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">Recent</a></li>
                          <li><a className="dropdown-item" href="#">Highest Rating</a></li>
                          <li><a className="dropdown-item" href="#">Lowest Rating</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="reviews-grid">
                    
                    <div className="review-card" data-aos="fade-up" data-aos-delay="100">
                      <div className="review-header">
                        <img src="assets/img/product/product-1.webp" alt="Product" className="product-image" loading="lazy"/>
                        <div className="review-meta">
                          <h4>Lorem ipsum dolor sit amet</h4>
                          <div className="rating">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <span>(5.0)</span>
                          </div>
                          <div className="review-date">Reviewed on Feb 15, 2025</div>
                        </div>
                      </div>
                      <div className="review-content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                      <div className="review-footer">
                        <button type="button" className="btn-edit">Edit Review</button>
                        <button type="button" className="btn-delete">Delete</button>
                      </div>
                    </div>

                
                    <div className="review-card" data-aos="fade-up" data-aos-delay="200">
                      <div className="review-header">
                        <img src="assets/img/product/product-2.webp" alt="Product" className="product-image" loading="lazy"/>
                        <div className="review-meta">
                          <h4>Consectetur adipiscing elit</h4>
                          <div className="rating">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star"></i>
                            <span>(4.0)</span>
                          </div>
                          <div className="review-date">Reviewed on Feb 10, 2025</div>
                        </div>
                      </div>
                      <div className="review-content">
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                      </div>
                      <div className="review-footer">
                        <button type="button" className="btn-edit">Edit Review</button>
                        <button type="button" className="btn-delete">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="tab-pane fade" id="addresses">
                  <div className="section-header" data-aos="fade-up">
                    <h2>My Addresses</h2>
                    <div className="header-actions">
                      <button type="button" className="btn-add-new">
                        <i className="bi bi-plus-lg"></i>
                        Add New Address
                      </button>
                    </div>
                  </div>

                  <div className="addresses-grid">
                    
                    <div className="address-card default" data-aos="fade-up" data-aos-delay="100">
                      <div className="card-header">
                        <h4>Home</h4>
                        <span className="default-badge">Default</span>
                      </div>
                      <div className="card-body">
                        <p className="address-text">123 Main Street<br/>Apt 4B<br/>New York, NY 10001<br/>United States</p>
                        <div className="contact-info">
                          <div><i className="bi bi-person"></i> Sarah Anderson</div>
                          <div><i className="bi bi-telephone"></i> +1 (555) 123-4567</div>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button type="button" className="btn-edit">
                          <i className="bi bi-pencil"></i>
                          Edit
                        </button>
                        <button type="button" className="btn-remove">
                          <i className="bi bi-trash"></i>
                          Remove
                        </button>
                      </div>
                    </div>

                    
                    <div className="address-card" data-aos="fade-up" data-aos-delay="200">
                      <div className="card-header">
                        <h4>Office</h4>
                      </div>
                      <div className="card-body">
                        <p className="address-text">456 Business Ave<br/>Suite 200<br/>San Francisco, CA 94107<br/>United States</p>
                        <div className="contact-info">
                          <div><i className="bi bi-person"></i> Sarah Anderson</div>
                          <div><i className="bi bi-telephone"></i> +1 (555) 987-6543</div>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button type="button" className="btn-edit">
                          <i className="bi bi-pencil"></i>
                          Edit
                        </button>
                        <button type="button" className="btn-remove">
                          <i className="bi bi-trash"></i>
                          Remove
                        </button>
                        <button type="button" className="btn-make-default">Make Default</button>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="tab-pane fade" id="settings">
                  <div className="section-header" data-aos="fade-up">
                    <h2>Account Settings</h2>
                  </div>

                  <div className="settings-content">
                    
                    <div className="settings-section" data-aos="fade-up">
                      <h3>Personal Information</h3>
                      <form className="php-email-form settings-form">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label for="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" value="Sarah" required=""/>
                          </div>
                          <div className="col-md-6">
                            <label for="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" value="Anderson" required=""/>
                          </div>
                          <div className="col-md-6">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" value="sarah@example.com" required=""/>
                          </div>
                          <div className="col-md-6">
                            <label for="phone" className="form-label">Phone</label>
                            <input type="tel" className="form-control" id="phone" value="+1 (555) 123-4567"/>
                          </div>
                        </div>

                        <div className="form-buttons">
                          <button type="submit" className="btn-save">Save Changes</button>
                        </div>

                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your changes have been saved successfully!</div>
                      </form>
                    </div>

                    
                    <div className="settings-section" data-aos="fade-up" data-aos-delay="100">
                      <h3>Email Preferences</h3>
                      <div className="preferences-list">
                        <div className="preference-item">
                          <div className="preference-info">
                            <h4>Order Updates</h4>
                            <p>Receive notifications about your order status</p>
                          </div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="orderUpdates" checked=""/>
                          </div>
                        </div>

                        <div className="preference-item">
                          <div className="preference-info">
                            <h4>Promotions</h4>
                            <p>Receive emails about new promotions and deals</p>
                          </div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="promotions"/>
                          </div>
                        </div>

                        <div className="preference-item">
                          <div className="preference-info">
                            <h4>Newsletter</h4>
                            <p>Subscribe to our weekly newsletter</p>
                          </div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="newsletter" checked=""/>
                          </div>
                        </div>
                      </div>
                    </div>

                    
                    <div className="settings-section" data-aos="fade-up" data-aos-delay="200">
                      <h3>Security</h3>
                      <form className="php-email-form settings-form">
                        <div className="row g-3">
                          <div className="col-md-12">
                            <label for="currentPassword" className="form-label">Current Password</label>
                            <input type="password" className="form-control" id="currentPassword" required=""/>
                          </div>
                          <div className="col-md-6">
                            <label for="newPassword" className="form-label">New Password</label>
                            <input type="password" className="form-control" id="newPassword" required=""/>
                          </div>
                          <div className="col-md-6">
                            <label for="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" required=""/>
                          </div>
                        </div>

                        <div className="form-buttons">
                          <button type="submit" className="btn-save">Update Password</button>
                        </div>

                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your password has been updated successfully!</div>
                      </form>
                    </div>

                    {/* <div className="settings-section danger-zone" data-aos="fade-up" data-aos-delay="300">
                      <h3>Delete Account</h3>
                      <div className="danger-zone-content">
                        <p>Once you delete your account, there is no going back. Please be certain.</p>
                        <button type="button" className="btn-danger">Delete Account</button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>

  </main>

    </>
  )
}

export default Profile;
