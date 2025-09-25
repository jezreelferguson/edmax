import React from 'react'
import { useState} from 'react'
import api from '../../../public/api/api'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';



function Admin() {
    const navigate = useNavigate();
       const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [data, setData] = useState([]);
    const PostDataA = async () => {
  const formData = new FormData();
  formData.append('email', form.email);      // ✅ Fixed: no colon
  formData.append('password', form.password);

  try {
    const res = await api.post('/admin', formData);
    console.log('Success response:', res.data);

    // Only runs if status is 200
    if (res.data.code === 200) {
      // Store admin token in localStorage
      localStorage.setItem('adminToken', res.data.token || 'admin_authenticated');
      
      Swal.fire({
        title: 'Success',
        text: res.data.message,
        icon: 'success',
        timer: 2000
      });
      navigate('/dashboard');
    }

  } catch (err) {
    // Axios error response
    if (err.response && err.response.data) {
      console.warn('Login failed:', err.response.data);
      Swal.fire('error!', err.response.data.message || 'Login failed', 'error');
    } else {
      console.error('Unexpected error:', err);
      alert('Something went wrong. Please try again.');
    }
  }
};

  return (
    <>
      <main className="d-flex w-100">
		<div className="container d-flex flex-column">
			<div className="row vh-100">
				<div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						<div className="text-center mt-4">
							<h1 className="h2">Welcome back!</h1>
							<p className="lead">
								Edmax Admin
							</p>
						</div>

						<div className="card">
							<div className="card-body">
								<div className="m-sm-3">
									<form onSubmit={(e) => { e.preventDefault(); PostDataA(); }}>
										<div className="mb-3">
											<label className="form-label">Email</label>
											<input className="form-control form-control-lg" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
										</div>
										<div className="mb-3">
											{/* <label className="form-label">Password</label> */}
											<input className="form-control form-control-lg" type="password" name="password" onChange={handleChange} value={form.password} placeholder="Enter your password" />
										</div>
										<div>
											<div className="form-check align-items-center">
												{/* <input id="customControlInline" type="checkbox" className="form-check-input" value="remember-me" name="remember-me" checked/> */}
												{/* <label className="form-check-label text-small" for="customControlInline">Remember me</label> */}
											</div>
										</div>
										<div className="d-grid gap-2 mt-3">
											<button type='submit' className="btn btn-lg btn-primary">Sign in</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						{/* <div className="text-center mb-3">
							Don't have an account? <a href="pages-sign-up.html">Sign up</a>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	</main>
    </>
  )
}

export default Admin
