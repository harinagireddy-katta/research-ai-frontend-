import React, { useState } from "react";
import { Link } from "react-router-dom";
import imgLogin from "./img-login.svg"; 
import "./styles.css"; 
import "./styles.scss";
import { registerfunction } from "../../services/Apis";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {

  const [inputdata,setInputdata] = useState({
    fname:"",
    email:"",
    password:"",
  });

  const navigate = useNavigate();

  // setinputvalue
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setInputdata({...inputdata,[name]:value})
  }


  // register data
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {fname,email,password} = inputdata;

    if(fname === ""){
      toast.error("Enter Your Name")
    }else if(email === ""){
      toast.error("Enter Your Email")
    }else if(!email.includes("@")){
      toast.error("Enter Valid Email")
    }else if(password === ""){
      toast.error("Enter Your Password")
    }else if(password.length < 6){
      toast.error("password length minimum 6 character")
    }else{
      const response = await registerfunction(inputdata);
      
      if(response.status === 200){
        setInputdata({...inputdata,fname:"",email:"",password:""});
        navigate("/signin")
      }else{
        toast.error(response.response.data.error);
      }
    }
  }
  return (
    <section>
    <div className="login">
      <div className="login__content">
        <div className="login__img">
          <img src={imgLogin} alt="Login" />
        </div>

        <div className="login__forms">
          <form className="login__create block" id="login-up">
            <h1 className="login__title">Create Account</h1>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input type="text" name="fname" id="" placeholder="Username" onChange={handleChange} className="login__input" />
            </div>

            <div className="login__box">
              <i className="bx bx-at login__icon"></i>
              <input type="email" name="email" id="" placeholder="Email" onChange={handleChange} className="login__input" />
            </div>

            <div className="login__box">
              <i className="bx bx-lock-alt login__icon"></i>
              <input type = "password" name="password" placeholder="Password" id="" onChange={handleChange} className="login__input" />
            </div>

            <button type="button" onClick = {handleSubmit} className="login__button">
              Sign Up
            </button>

            <div>
              <span className="login__account">Already have an Account?</span>
              <Link to="/signin" className="login__signup">
                Sign In
              </Link>
            </div>

            <div className="login__social">
              <a href="#" className="login__social-icon">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#" className="login__social-icon">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="#" className="login__social-icon">
                <i className="bx bxl-google"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
    </section>
  );
};

export default SignUp;
