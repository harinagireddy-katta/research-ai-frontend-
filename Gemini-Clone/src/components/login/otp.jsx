import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from '../../services/Apis';
import { useAuthContext } from '../../reducer/useAuthContext';
import imgLogin from "./img-login.svg"; 
import "./styles.css"; 
import "./styles.scss";

const Otp = () => {
  const { dispatch } = useAuthContext();
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      toast.error("Enter Your Otp");
    } else if (!/^\d+$/.test(otp)) {
      toast.error("Enter Valid Otp");
    } else if (otp.length < 6) {
      toast.error("Otp Length minimum 6 digits");
    } else {
      const data = {
        otp, email: location.state
      };

      const response = await userVerify(data);
      const json = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
        navigate("/");
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  return (
    <>
    <section>
    <div className="login">
      <div className="login__content">
        <div className="login__img">
          <img src={imgLogin} alt="OTP" />
        </div>

        <div className="login__forms">
          <form className="login__registre block" id="otp-in">
            <h1 className="login__title">Enter OTP</h1>

            <div className="login__box">
              <i className="bx bx-key login__icon"></i>
              <input 
                type="text" 
                name="otp" 
                id="" 
                onChange={(e) => setOtp(e.target.value)} 
                placeholder="OTP" 
                className="login__input" 
              />
            </div>

            <button type="button" onClick={LoginUser} className="login__button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
    </section>
    </>
  );
};

export default Otp;
