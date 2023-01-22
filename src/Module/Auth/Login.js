import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GetRequest, loginPostRequest } from "./../ApiHandler/ApiHandler";
import swal from "sweetalert";
function Login({ setAuthToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpId, setOtpId] = useState("");
  const [userData, setUserData] = useState();
  const [showOtp, setShowOtp] = useState(true);
  const [mobile, setMobile] = useState();
  let history = useHistory();

  async function loginHandler() {
    if (!email || !password) {
      swal({
        title: "Error",
        text: "Please enter email and password",
        icon: "error",
        button: "Ok",
      });
      return;
    }
    let item = { email, password };
    let returnValue = await loginPostRequest("adminLogin", item);

    if (returnValue.accessToken) {
      let otpResponse = await GetRequest("getOtp");
      // let otpResponse = {
      //   status: 200,
      // };
      if (otpResponse?.status !== 200) {
        swal({
          title: "Error",
          text: "Something went wrong, Try Again!",
          icon: "error",
          button: "Ok",
        });
      } else {
        // let sessionObj = {
        //   status: "Active",
        //   userData: returnValue,
        //   expiry: new Date().getTime() + 3600000 * 10, // (10 hr)
        // };
        // localStorage.setItem("hospitality", JSON.stringify(sessionObj));
        // setAuthToken(true);
        // history.push("/view-registration");
        // return;
        setUserData(returnValue);
        const { otp_id, check } = otpResponse.data;
        setOtpId(otp_id);
        const fullNumber = check;
        const last4Digits = fullNumber.slice(-4);
        const maskedNumber = last4Digits.padStart(fullNumber.length, "*");
        setMobile(maskedNumber);
        setShowOtp(false);
      }
    } else {
      swal({
        title: "Error",
        text: "Email id Or Password is Incorrect!",
        icon: "error",
        button: "Ok",
      });
    }
  }

  const verifyOtpHandler = async () => {
    if (!otp) {
      swal({
        title: "Error",
        text: "Please enter OTP",
        icon: "error",
        button: "Ok",
      });
      return;
    }
    let item = { otp, otp_id: otpId };
    let returnValue = await loginPostRequest("verifyOtp", item);
    if (returnValue?.status === 200) {
      let sessionObj = {
        status: "Active",
        userData,
        expiry: new Date().getTime() + 3600000 * 10, // (10 hr)
      };
      localStorage.setItem("hospitality", JSON.stringify(sessionObj));
      setAuthToken(true);
      history.push("/view-registration");
    } else {
      swal({
        title: "Error",
        text: "Please enter valid OTP",
        icon: "error",
        button: "Ok",
      });
    }
  };

  return (
    <div>
      <div className="bg-fixed-02">
        <div className="container-fluid h-100 overflow-y">
          <div className="row flex-row h-100">
            <div className="col-12 my-auto">
              <div className="password-form mx-auto">
                <div className="logo-centered logoCenterCss"></div>
                <h3 className="colorLogin">Login Form</h3>
                <div className="group material-input">
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!showOtp}
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  {showOtp && <label>Email</label>}
                </div>
                <div className="group material-input">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!showOtp}
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  {showOtp && <label>Password</label>}
                </div>
                {!showOtp && (
                  <label className="mb-5">
                    {`You will receive an OTP on your registered mobile number
                    ${mobile}, enter the same to continue.`}
                  </label>
                )}
                {!showOtp && (
                  <div className="group material-input">
                    <input
                      type="password"
                      onChange={(e) => setOtp(e.target.value)}
                      required={true}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Enter OTP</label>
                  </div>
                )}
                <div className="button text-center">
                  {showOtp ? (
                    <button
                      onClick={loginHandler}
                      className="btn btn-lg btn-gradient-01"
                    >
                      Get Otp
                    </button>
                  ) : (
                    <button
                      onClick={verifyOtpHandler}
                      className="btn btn-lg btn-gradient-01"
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
