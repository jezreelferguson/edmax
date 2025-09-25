import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/UI/Footer";
import api from "../api/api";
import { useCart } from "../contexts/CartContext";
export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cartCount } = useCart();

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/product");
      const products = Array.isArray(res.data) ? res.data : [];
      // Take only first 4 products as ads
      setFeaturedProducts(products.slice(0, 4));
    } catch (err) {
      console.error("Failed to load featured products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  return (
    <>
      <section id="hero" className="hero section">
        <div className="hero-container">
          <div className="hero-content">
            <div
              className="content-wrapper"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h1 className="hero-title">Discover Amazing Products</h1>
              <p className="hero-description">
                Explore our curated collection of premium items designed to
                enhance your lifestyle. From fashion to tech, find everything
                you need with exclusive deals and fast shipping.
              </p>
              <div
                className="hero-actions"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <Link to={"/product"} className="btn-primary">
                  Shop Now
                </Link>
                <a href="#categories" className="btn-secondary">
                  Browse Categories
                </a>
              </div>
              <div
                className="features-list"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="feature-item">
                  <i className="bi bi-truck"></i>
                  <span>Free Shipping</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-award"></i>
                  <span>Quality Guarantee</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-headset"></i>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visuals">
            <div
              className="product-showcase"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : featuredProducts.length > 0 ? (
                <>
                  <div className="product-card featured">
                    <img
                      src={
                        featuredProducts[0]?.image
                          ? (String(featuredProducts[0].image).startsWith("http")
                              ? featuredProducts[0].image
                              : `${import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "") || "http://localhost:8000"}/storage/${featuredProducts[0].image}`)
                          : "src/assets/images/products/image-1.jpeg"
                      }
                      alt={featuredProducts[0]?.name || "Featured Product"}
                      className="img-fluid"
                    />
                    <div className="product-badge">Featured</div>
                    <div className="product-info">
                      <h4>{featuredProducts[0]?.name || "Premium Product"}</h4>
                      <div className="price">
                        <span className="sale-price">
                          GH₵{featuredProducts[0]?.price?.toFixed(2) || "0.00"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="product-grid">
                    {featuredProducts.slice(1, 3).map((product, index) => {
                      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
                      const fileBase = apiBase.replace(/\/api\/?$/, "");
                      const imageSrc = product.image
                        ? (String(product.image).startsWith("http")
                            ? product.image
                            : `${fileBase}/storage/${product.image}`)
                        : "src/assets/images/products/image-2.jpeg";
                      
                      return (
                        <div
                          key={product.id || product._id || index}
                          className="product-mini"
                          data-aos="zoom-in"
                          data-aos-delay={400 + (index * 100)}
                        >
                          <img
                            src={imageSrc}
                            alt={product.name || "Product"}
                            className="img-fluid"
                          />
                          <span className="mini-price">
                            GH₵{product.price?.toFixed(2) || "0.00"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="product-card featured">
                  <img
                    src="src/assets/images/products/image-1.jpeg"
                    alt="Featured Product"
                    className="img-fluid"
                  />
                  <div className="product-badge">Best Seller</div>
                  <div className="product-info">
                    <h4>Premium Wireless Headphones</h4>
                    <div className="price">
                      <span className="sale-price">GH₵200</span>
                      <span className="original-price">GH₵399</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="floating-elements">
              <div
                className="floating-icon cart"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <i className="bi bi-cart3"></i>
                {cartCount > 0 && <span className="notification-dot">{cartCount}</span>}
              </div>
              <div
                className="floating-icon wishlist"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <i className="bi bi-heart"></i>
              </div>
              <div
                className="floating-icon search"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <i className="bi bi-search"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="featured-products section">
        <div className="container">
          <div className="section-title text-center" data-aos="fade-up">
            <h2>Featured Products</h2>
            <p>Discover our handpicked selection of premium products</p>
          </div>
          
          <div className="row g-4">
            {loading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => {
                const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
                const fileBase = apiBase.replace(/\/api\/?$/, "");
                const imageSrc = product.image
                  ? (String(product.image).startsWith("http")
                      ? product.image
                      : `${fileBase}/storage/${product.image}`)
                  : "src/assets/images/products/image-1.jpeg";
                
                return (
                  <div key={product.id || product._id || index} className="col-lg-3 col-md-6">
                    <div 
                      className="product-item"
                      data-aos="fade-up"
                      data-aos-delay={100 * index}
                    >
                      <div className="product-image">
                        <img
                          src={imageSrc}
                          alt={product.name || "Product"}
                          className="img-fluid"
                          loading="lazy"
                        />
                        <div className="product-badge">Featured</div>
                      </div>
                      <div className="product-info">
                        <h4 className="product-name">{product.name || "Premium Product"}</h4>
                        <div className="product-price">
                          <span className="current-price">GH₵{product.price?.toFixed(2) || "0.00"}</span>
                        </div>
                        <Link to="/product" className="btn btn-outline-primary btn-sm mt-2">
                          View All Products
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center py-5">
                <p>No featured products available at the moment.</p>
                <Link to="/product" className="btn btn-primary">
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="promo-cards" className="promo-cards section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div
                className="category-featured"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="category-image">
                  <img
                    src="src/assets/images/products/image-6.jpeg"
                    alt="Women's Collection"
                    className="img-fluid"
                  />
                </div>
                <div className="category-content">
                  <span className="category-tag">Trending Now</span>
                  <h2>New Equipment and Tools Collection</h2>
                  <p>
                    Upgrade your toolkit with our latest arrivals.
                  </p>
                  <p>
                    Shop now and take advantage of exclusive offers on top
                    brands.
                  </p>
                  <Link to={'/product'} className="btn-shop">
                    Explore Collection <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="row gy-4">
                <div className="col-xl-6">
                  <div
                    className="category-card cat-men"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="category-image">
                      <img
                        src="src/assets/images/products/image-8.jpeg"
                        alt="Men's Fashion"
                        className="img-fluid"
                      />
                    </div>
                    <div className="category-content">
                      <h4>Tool 1</h4>
                      {/* <p>242 products</p> */}
                      <Link to={'/product'}className="card-link">
                        Shop Now <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6">
                  <div
                    className="category-card cat-kids"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="category-image">
                      <img
                        src="src/assets/images/products/image-19.jpeg"
                        alt="Kid's Fashion"
                        className="img-fluid"
                      />
                    </div>
                    <div className="category-content">
                      <h4>Tool 2</h4>
                      {/* <p>185 products</p> */}
                      <Link to={'/product'} className="card-link">
                        Shop Now <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6">
                  <div
                    className="category-card cat-cosmetics"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <div className="category-image">
                      <img
                        src="src/assets/images/products/imqge-9.jpeg"
                        alt="Cosmetics"
                        className="img-fluid"
                      />
                    </div>
                    <div className="category-content">
                      <h4>Tool 3</h4>
                      {/* <p>127 products</p> */}
                      <Link to={'/product'}className="card-link">
                        Shop Now <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6">
                  <div
                    className="category-card cat-accessories"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <div className="category-image">
                      <img
                        src="src/assets/images/products/image-7.jpeg"
                        alt="Accessories"
                        className="img-fluid"
                      />
                    </div>
                    <div className="category-content">
                      <h4>Tool 4</h4>
                      {/* <p>308 products</p> */}
                      <Link to={'/product'} className="card-link">
                        Shop Now <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
