import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from "../../api/api";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



function Signin() {
  const navigate = useNavigate();
    const [form, setForm] = useState({
        // name: '',
        email: '',
        password: ''
    })

     const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
    const postData = async () => {
  try {
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);

    const res = await api.post("/signin", formData);

    console.log("Api Res:", res.data);

    if (res.data.code === 201 || res.data.code === 200) {
      // ✅ store token in localStorage (or sessionStorage if you prefer)
      localStorage.setItem("token", res.data.token);
       localStorage.setItem("user", JSON.stringify(res.data.user)); // optional

      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
      });

      navigate("/");
    } else {
      Swal.fire({
        title: "Error",
        text: "Invalid credentials",
        icon: "error",
      });
    }
  } catch (err) {
    console.log("Error:", JSON.stringify(err, null, 2));
    const message = err?.response?.data?.message
    const errors = err?.response?.data?.errors
    const errorText = errors ? Object.values(errors).flat().join(' ') : (message || 'Invalid credentials')
    Swal.fire({ title: "Error", text: errorText, icon: "error" });
  }
};

    
  return (
    <>
        <main className="main">

    <div className="page-title light-background">
      <div className="container d-lg-flex justify-content-between align-items-center">
        <h1 className="mb-2 mb-lg-0">Sign In</h1>
        <nav className="breadcrumbs">
          <ol>
            <li><a href="index.html">Home</a></li>
            <li className="current">Sign In</li>
          </ol>
        </nav>
      </div>
    </div>

    <section id="login" className="login section">

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="auth-container" data-aos="fade-in" data-aos-delay="200">

              <div className="auth-form login-form active">
                <div className="form-header">
                  <h3>Get Started Here</h3>
                  <p>Sign In</p>
                </div>

                <form className="auth-form-content" onSubmit={(e) => { e.preventDefault(); postData(); }}>
                  {/* <div className="input-group mb-3">
                    <span className="input-icon">
                      <i className="bi bi-book"></i>
                    </span>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Full Name" />
                  </div> */}

                    <div className="input-group mb-3">
                    <span className="input-icon">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="Email address" />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-icon">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" placeholder="Password" required autoComplete="current-password"/>
                    <span className="password-toggle">
                      <i className="bi bi-eye"></i>
                    </span>
                  </div>

                  <div className="form-options mb-4">
                    <div className="remember-me">
                      <input type="checkbox" id="rememberLogin"/>
                      {/* <label for="rememberLogin">Remember me</label> */}
                    </div>
                    <a href="#" className="forgot-password">Forgot password?</a>
                  </div>

                  <button type="submit" className="auth-btn primary-btn mb-3">
                    Sign In
                    <i className="bi bi-arrow-right"></i>
                  </button>

                  <div className="divider">
                    <span>or</span>
                  </div>

                  <button type="button" className="auth-btn social-btn">
                    <i className="bi bi-google"></i>
                    Continue with Google
                  </button>

                  <div className="switch-form">
                    <span>Already have an account?</span>
                    <Link to={'/signin'}>
                    <button type="button" className="switch-btn" data-target="register">Sign into your account</button>
                    
                    </Link>
                  </div>
                </form>
              </div>

              <div className="auth-form register-form">
                <div className="form-header">
                  <h3>Create Account</h3>
                  <p>Join us today and get started</p>
                </div>

                <form className="auth-form-content">
                  <div className="name-row">
                    <div className="input-group">
                      <span className="input-icon">
                        <i className="bi bi-person"></i>
                      </span>
                      <input type="text" className="form-control" placeholder="First name" required="" autocomplete="given-name"/>
                    </div>
                    <div className="input-group">
                      <span className="input-icon">
                        <i className="bi bi-person"></i>
                      </span>
                      <input type="text" className="form-control" placeholder="Last name" required="" autocomplete="family-name"/>
                    </div>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-icon">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input type="email" className="form-control" placeholder="Email address" />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-icon">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input type="password" className="form-control" placeholder="Create password" required="" autocomplete="new-password"/>
                    <span className="password-toggle">
                      <i className="bi bi-eye"></i>
                    </span>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-icon">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <input type="password" className="form-control" placeholder="Confirm password" required="" autocomplete="new-password"/>
                    <span className="password-toggle">
                      <i className="bi bi-eye"></i>
                    </span>
                  </div>

                  <div className="terms-check mb-4">
                    <input type="checkbox" id="termsRegister" required=""/>
                    {/* <label for="termsRegister"> */}
                      I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    {/* </label> */}
                  </div>

                  <button type="submit" className="auth-btn primary-btn mb-3">
                    Create Account
                    <i className="bi bi-arrow-right"></i>
                  </button>

                  <div className="divider">
                    <span>or</span>
                  </div>

                  <button type="button" className="auth-btn social-btn">
                    <i className="bi bi-google"></i>
                    Sign In with Google
                  </button>

                  {/* <div className="switch-form">
                    <span>Already have an account?</span>
                    <button type="button" className="switch-btn" data-target="login">Sign in</button>
                  </div> */}
                </form>
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

export default Signin
