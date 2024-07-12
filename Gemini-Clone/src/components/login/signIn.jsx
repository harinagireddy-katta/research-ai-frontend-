import React , { useState } from "react";
import { Link } from "react-router-dom";
import imgLogin from "./img-login.svg"; 
import { sentOtpFunction } from "../../services/Apis";
import { NavLink, useNavigate } from "react-router-dom"
import "./styles.css"; 
import "./styles.scss";
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';


const SignIn = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spiner,setSpiner] = useState(false);

    const navigate = useNavigate();



    // sendotp
    const sendOtp = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Enter Your Email !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        }
        if(password === ""){
            toast.error("Enter Your Password")
        } //else if(password.length < 6){
        //     toast.error("password length minimum 6 character")
        // }
        else {
            setSpiner(true)
            const data = {
                email: email,
                password:password
            }

            const response = await sentOtpFunction(data);

            if (response.status === 200) {
                setSpiner(false)
                navigate("/otp",{state:email,password})
                
            } else {
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
          <form className="login__registre block" id="login-in">
            <h1 className="login__title">Sign In</h1>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input type="email" name="email" id="" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="login__input" />
            </div>

            <div className="login__box">
              <i className="bx bx-lock-alt login__icon"></i>
              <input type="password" name="email" id="" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="login__input" />
            </div>

            {/* <a href="#" className="login__forgot">
              Forgot password?
            </a> */}

            <button type="button" onClick={sendOtp} className="login__button">
              Sign In
              {
                  spiner ? <span><Spinner animation="border" /></span>:""
              }
            </button>

            <div>
              <span className="login__account">Don't have an Account?</span>
              <Link to="/signup" className="login__signin">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
    </section>
  );
};

export default SignIn;
