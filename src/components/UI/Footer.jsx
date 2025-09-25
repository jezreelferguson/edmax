import React from 'react'
import "/public/template/NiceShop/assets/vendor/bootstrap/css/bootstrap.min.css";
import "/public/template/NiceShop/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "/public/template/NiceShop/assets/css/main.css";
import { Link } from 'react-router-dom';
function Footer() {
  const date = new Date().getFullYear();
  return (
    <>
     <footer id="footer" className="footer dark-background">
    <div className="footer-main">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <div className="footer-widget footer-about">
              <a href="index.html" className="logo">
                <span className="sitename">Edmax</span>
              </a>
              <p>We are dedicated to providing top-notch tools and equipment to our customers.
                Our commitment to quality and customer satisfaction sets us apart in the industry.

              </p>

              <div className="social-links mt-4">
                <h5>Connect With Us</h5>
                <div className="social-icons">
                  <a href="https://web.facebook.com/MusicJago" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                  <a href="https://www.instagram.com/edmaxtools?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                  <a href="https://x.com/Edi_OneVentures?t=B4X7_4tJcS0TIuPc2qpD5Q&s=09" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
                  <a href="https://www.tiktok.com/@edimax_0?_d=secCgYIASAHKAESPgo8eLpSb5VfE5AWlUKO5INTPdDhGYg19daYdHz2AanbjiB89BZRFjejFVS6eZasCbqD9sBnxo1s975noA8gGgA%3D&_svg=1&checksum=dc369bb74e0d917cce056097cb896be6724aa15476ba334def99b4d402712f02&lang=en&sec_uid=MS4wLjABAAAATC6f_s8cwcJRwAQ17CH9wmFbFfAXtIE0QB6MZ1XjsiqwRM7uWx-Ut6d1ABrkCY3Q&sec_user_id=MS4wLjABAAAAtswUvMjMDaab8zATzqPbxKydJfW4F1b-D2usFRrKjZwmug1oembDCSKCO6R1Rjj5&share_app_id=1340&share_author_id=7029059326811882502&share_link_id=97069974-b420-490d-8b5a-4c126bfe22bd&share_scene=1&sharer_language=en&timestamp=1755593741&u_code=e573m33m8dk909&ugbiz_name=Account&user_id=7172916010927834118&utm_campaign=client_share&utm_source=copy&_r=1" aria-label="TikTok"><i className="bi bi-tiktok"></i></a>

                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-lg-2 col-md-6 col-sm-6">
            <div className="footer-widget">
              <h4>Shop</h4>
              <ul className="footer-links">
                <li><a href="category.html">New Arrivals</a></li>
                <li><a href="category.html">Bestsellers</a></li>
                <li><a href="category.html">Women's Clothing</a></li>
                <li><a href="category.html">Men's Clothing</a></li>
                <li><a href="category.html">Accessories</a></li>
                <li><a href="category.html">Sale</a></li>
              </ul>
            </div>
          </div> */}
{/* 
          <div className="col-lg-2 col-md-6 col-sm-6">
            <div className="footer-widget">
              <h4>Support</h4>
              <ul className="footer-links">
                <li><a href="support.html">Help Center</a></li>
                <li><a href="account.html">Order Status</a></li>
                <li><a href="shiping-info.html">Shipping Info</a></li>
                <li><a href="return-policy.html">Returns &amp; Exchanges</a></li>
                <li><a href="#">Size Guide</a></li>
                <li><a href="contact.html">Contact Us</a></li>
              </ul>
            </div>
          </div> */}

          <div className="col-lg-4 col-md-6">
            <div className="footer-widget">
              <h4>Contact Information</h4>
              <div className="footer-contact">
                <div className="contact-item">
                  <i className="bi bi-geo-alt"></i>
                  <span>Accra, Ghana</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-telephone"></i>
                  <span>+223 247886217</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-envelope"></i>
                  <span>hello@example.com</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-clock"></i>
                  <span>Monday-: 9am-6pm<br/>Tuesday-Saturday: 7am-6pm Sunday: Closed</span>
                </div>
              </div>

              <div className="app-buttons mt-4">
                <a href="#" className="app-btn">
                  <i className="bi bi-apple"></i>
                  <span>App Store</span>
                </a>
                <a href="#" className="app-btn">
                  <i className="bi bi-google-play"></i>
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <div className="container">
        <div className="row gy-3 align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="copyright">
              <p>©<span>{date} Copyright</span> <strong className="sitename">Edmax</strong>. All Rights Reserved.</p>
            </div>
            <div className="credits mt-1">
              {/* Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> */}
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="d-flex flex-wrap justify-content-lg-end justify-content-center align-items-center gap-4">
              <div className="payment-methods">
                <div className="payment-icons">
                  <i className="bi bi-credit-card" aria-label="Credit Card"></i>
                  <i className="bi bi-paypal" aria-label="PayPal"></i>
                  <i className="bi bi-apple" aria-label="Apple Pay"></i>
                  <i className="bi bi-google" aria-label="Google Pay"></i>
                  <i className="bi bi-shop" aria-label="Shop Pay"></i>
                  <i className="bi bi-cash" aria-label="Cash on Delivery"></i>
                </div>
              </div>

              <div className="legal-links">
                <Link to={"/"}>Terms</Link>
                <Link to={"/"}>Privacy</Link>
                <Link to={"/"} >Cookies</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </footer>
    </>
  )
}

export default Footer;
