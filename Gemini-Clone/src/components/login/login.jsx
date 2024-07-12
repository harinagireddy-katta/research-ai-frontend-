import React, { useState } from "react";
import "./styles.css"; 
import "./styles.scss";
import imgLogin from "./img-login.svg"; 

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__img">
          <img src={imgLogin} alt="Login" /> {/* Use the imported image */}
        </div>

        <div className="login__forms">
          <form
            className={`login__registre ${isSignUp ? "none" : "block"}`}
            id="login-in"
          >
            <h1 className="login__title">Sign In</h1>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input type="text" placeholder="Username" className="login__input" />
            </div>

            <div className="login__box">
              <i className="bx bx-lock-alt login__icon"></i>
              <input type="password" placeholder="Password" className="login__input" />
            </div>

            <a href="#" className="login__forgot">
              Forgot password?
            </a>

            <button type="button" className="login__button">
              Sign In
            </button>

            <div>
              <span className="login__account">Don't have an Account?</span>
              <span className="login__signin" id="sign-up" onClick={handleSignUpClick}>
                Sign Up
              </span>
            </div>
          </form>

          <form
            className={`login__create ${isSignUp ? "block" : "none"}`}
            id="login-up"
          >
            <h1 className="login__title">Create Account</h1>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input type="text" placeholder="Username" className="login__input" />
            </div>

            <div className="login__box">
              <i className="bx bx-at login__icon"></i>
              <input type="text" placeholder="Email" className="login__input" />
            </div>

            <div className="login__box">
              <i className="bx bx-lock-alt login__icon"></i>
              <input type="password" placeholder="Password" className="login__input" />
            </div>

            <button type="button" className="login__button">
              Sign Up
            </button>

            <div>
              <span className="login__account">Already have an Account?</span>
              <span className="login__signup" id="sign-in" onClick={handleSignInClick}>
                Sign In
              </span>
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
  );
};

export default Login;
