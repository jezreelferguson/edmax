import React from 'react'
import Swal from 'sweetalert2';
import Footer from '../components/UI/Footer';

export default function About() {
    const msg = ()=>{
    Swal.fire({
    title: 'You Clicked Me',
    icon:'warning',
    text: 'Bro you clicked me',
    timer:1000,
    timerProgressBar: true
    })
    }
  return (
    <>
    
  <main className="main">

    <div className="page-title light-background">
      <div className="container d-lg-flex justify-content-between align-items-center">
        <h1 className="mb-2 mb-lg-0">About</h1>
        <nav className="breadcrumbs">
          <ol>
            <li><a href="index.html">Home</a></li>
            <li className="current">About</li>
          </ol>
        </nav>
      </div>
    </div>

    
    <section id="about-2" className="about-2 section">

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <span className="section-badge"><i className="bi bi-info-circle"></i> About Us</span>
        <div className="row">
          <div className="col-lg-6">
            <h2 className="about-title">Welcome To Edmax Tools and Power Technology</h2>
            <p className="about-description">Your one-stop shop for all power tools and equipment needs.
            We specialize in providing high-quality tools and equipment for both professionals and DIY enthusiasts.
            </p>
          </div>
          <div className="col-lg-6">
            <p className="about-text">At Edmax, we are committed to providing top-notch tools and equipment to our customers.</p>
            <p className="about-text">We believe in the power of precision and strive to offer products that meet the highest standards of quality and performance.</p>
          </div>
        </div>

        <div className="row features-boxes gy-4 mt-3">
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div className="feature-box">
              <div className="icon-box">
                <i className="bi bi-bullseye"></i>
              </div>
              <h3><a href="#" className="stretched-link">Quality</a></h3>
              <p>Go-to hub for quality & affordable water pumps, power tools, generators, and other hardware ranges.</p>
            </div>
          </div>

          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
            <div className="feature-box">
              <div className="icon-box">
                <i className="bi bi-person-check"></i>
              </div>
              <h3><a href="#" className="stretched-link">Satisfaction</a></h3>
              <p>Customer satisfaction is our top priority, and we strive to exceed expectations with every purchase.</p>
            </div>
          </div>

          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="400">
            <div className="feature-box">
              <div className="icon-box">
                <i className="bi bi-clipboard-data"></i>
              </div>
              <h3><a href="#" className="stretched-link">Quality Assurance</a></h3>
              <p>Our products undergo rigorous testing to ensure they meet the highest standards of quality and performance.</p>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-12" data-aos="zoom-in" data-aos-delay="200">
            <div className="video-box">
              <img src="src/assets/images/products/Hero-image.jpg" className="img-fluid" alt="Video Thumbnail"/>
              <a href="https://web.facebook.com/share/v/16iEPgoLxw/" className="glightbox pulsating-play-btn"></a>
            </div>
          </div>
        </div>

      </div>

    </section>


    <section id="stats" className="stats section light-background">

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row gy-4">

          <div className="col-lg-3 col-md-6">
            <div className="stats-item">
              <i className="bi bi-emoji-smile"></i>
              <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter"></span>
              <p><strong>Happy Clients</strong> <span>consequuntur quae</span></p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-item">
              <i className="bi bi-journal-richtext"></i>
              <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter"></span>
              <p><strong>Projects</strong> <span>adipisci atque cum quia aut</span></p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-item">
              <i className="bi bi-headset"></i>
              <span data-purecounter-start="0" data-purecounter-end="1453" data-purecounter-duration="1" className="purecounter"></span>
              <p><strong>Hours Of Support</strong> <span>aut commodi quaerat</span></p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-item">
              <i className="bi bi-people"></i>
              <span data-purecounter-start="0" data-purecounter-end="32" data-purecounter-duration="1" className="purecounter"></span>
              <p><strong>Hard Workers</strong> <span>rerum asperiores dolor</span></p>
            </div>
          </div>

        </div>

      </div>

    </section>

    
    <section id="testimonials" className="testimonials section">

      <div className="container">

        <div className="testimonial-masonry">

          <div className="testimonial-item" data-aos="fade-up">
            <div className="testimonial-content">
              <div className="quote-pattern">
                <i className="bi bi-quote"></i>
              </div>
              <p>Implementing innovative strategies has revolutionized our approach to market challenges and competitive positioning.</p>
              <div className="client-info">
                <div className="client-image">
                  <img src="/public/template/NiceShop/assets/img/person/person-f-7.webp" alt="Client"/>
                </div>
                <div className="client-details">
                  <h3>Rachel Bennett</h3>
                  <span className="position">Strategy Director</span>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-item highlight" data-aos="fade-up" data-aos-delay="100">
            <div className="testimonial-content">
              <div className="quote-pattern">
                <i className="bi bi-quote"></i>
              </div>
              <p>Exceptional service delivery and innovative solutions have transformed our business operations, leading to remarkable growth and enhanced customer satisfaction across all touchpoints.</p>
              <div className="client-info">
                <div className="client-image">
                  <img src="/public/template/NiceShop/assets/img/person/person-m-7.webp" alt="Client"/>
                </div>
                <div className="client-details">
                  <h3>Daniel Morgan</h3>
                  <span className="position">Chief Innovation Officer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-item" data-aos="fade-up" data-aos-delay="200">
            <div className="testimonial-content">
              <div className="quote-pattern">
                <i className="bi bi-quote"></i>
              </div>
              <p>Strategic partnership has enabled seamless digital transformation and operational excellence.</p>
              <div className="client-info">
                <div className="client-image">
                  <img src="/public/template/NiceShop/assets/img/person/person-f-8.webp" alt="Client"/>
                </div>
                <div className="client-details">
                  <h3>Emma Thompson</h3>
                  <span className="position">Digital Lead</span>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-item" data-aos="fade-up" data-aos-delay="300">
            <div className="testimonial-content">
              <div className="quote-pattern">
                <i className="bi bi-quote"></i>
              </div>
              <p>Professional expertise and dedication have significantly improved our project delivery timelines and quality metrics.</p>
              <div className="client-info">
                <div className="client-image">
                  <img src="/public/template/NiceShop/assets/img/person/person-m-8.webp" alt="Client"/>
                </div>
                <div className="client-details">
                  <h3>Christopher Lee</h3>
                  <span className="position">Technical Director</span>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-item highlight" data-aos="fade-up" data-aos-delay="400">
            <div className="testimonial-content">
              <div className="quote-pattern">
                <i className="bi bi-quote"></i>
              </div>
              <p>Collaborative approach and industry expertise have revolutionized our product development cycle, resulting in faster time-to-market and increased customer engagement levels.</p>
              <div className="client-info">
                <div className="client-image">
                  <img src="/public/template/NiceShop/assets/img/person/person-f-9.webp" alt="Client"/>
                </div>
                <div className="client-details">
                  <h3>Olivia Carter</h3>
                  <span className="position">Product Manager</span>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-item" data-aos="fade-up" data-aos-delay="500">
            <div className="testimonial-content">
              <div className="quote-pattern">
                <i className="bi bi-quote"></i>
              </div>
              <p>Innovative approach to user experience design has significantly enhanced our platform's engagement metrics and customer retention rates.</p>
              <div className="client-info">
                <div className="client-image">
                  <img src="/public/template/NiceShop/assets/img/person/person-m-13.webp" alt="Client"/>
                </div>
                <div className="client-details">
                  <h3>Nathan Brooks</h3>
                  <span className="position">UX Director</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>

  </main>
    
    
    <Footer />
    
    </>
  );


}
