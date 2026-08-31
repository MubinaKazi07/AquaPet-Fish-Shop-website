
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

import logo from "../assets/logo.png";
function AdminLogin() 

{
    let navigate = useNavigate();
    useEffect(() => {
    const loginStatus = Cookies.get("isAdminLoggedIn");

    if (loginStatus === "true") {
        navigate("/admindashboard");
    }
}, [navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (
            email.toLowerCase() === "admin@aquapet.com" &&
            password === "admin123"
        ) {
            Cookies.set("isAdminLoggedIn", "true", { expires: 1 });
            alert("Login Successful");
            navigate("/admindashboard");
        } else {
            alert("Invalid Email or Password");
            setEmail("admin@aquapet.com");
            setPassword("admin123");
        }

   
    }
    return (
        <>
       
           <section
  className="bg-light d-flex justify-content-center align-items-center"
  style={{
    minHeight: "100vh",
    paddingTop: "30px",
  }}
>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="card border border-light-subtle rounded-3 shadow-sm">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="text-center mb-2">
                                 
                                        <img
                                             src={logo}
                                             alt="AquaPet Logo"
                                                    width="120"
                                           className="mb-3"
                                                        />
                                                    
                                        <div/>
                                       
                                    </div>
                                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row gy-2 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" name="email" id="email" placeholder="name@example.com" required />
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" class="form-control" name="password" id="password" placeholder="Password" required />
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid my-3">
                                                    <button className="btn btn-primary btn-lg" type="submit">Log in</button>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                               
                                                <p className="m-0 text-secondary text-center">Don't have an account? <a href="#!" class="link-primary text-decoration-none">Sign up</a></p>




                                            </div>



                                        </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               
            </section>
        </>
    );
}

export default AdminLogin;

