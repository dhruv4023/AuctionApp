import { useTheme } from "@emotion/react";
import { Button, TextField } from "@mui/material";
import emailjs from "@emailjs/browser";
import FlexEvenly from "Components/FlexEvenly";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { register, sendMail, updateProfile } from "./LoginRegisterChangePass";
import { useDispatch, useSelector } from "react-redux";

const EmailVerification = () => {
  // Get the current location and navigation function
  const location = useLocation();
  const navigate = useNavigate();

  // Redux store dispatch
  const dispatch = useDispatch();
  const values = location.state;
  const { palette } = useTheme();

  // Redirect to the home page if no values are present
  useEffect(() => {
    !values && navigate("/", { state: null });
  });

  // State variables for OTP handling
  const [sentOtp, setSentOtp] = useState();
  const token = useSelector((s) => s.token);
  const [otp, setOtp] = useState(0);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (String(otp).trim() === String(sentOtp)) {
      if (values?.page === "changepass") {
        // Navigate to change password page
        navigate("/changepass", {
          state: { email: values.email, page: "makenewpass" },
        });
      } else if (!values._id) {
        // Handle registration
        register(values, dispatch, navigate);
        navigate("/login", { state: null });
      } else {
        // Handle profile update
        updateProfile(values, dispatch, token, navigate);
      }
    } else {
      alert("Invalid OTP");
    }
  };

  // Send OTP email and update UI accordingly
  const sendOtpMail = (otpnum, to_mail) => {
    setSentOtp(otpnum);
    sendMail(to_mail, otpnum);
  };

  // State variables and functions for sending OTP
  const [sendOtpBtnVal, setSendOtpBtnVal] = useState("Click here to Send OTP");
  const [disableBtn, setdisableBtn] = useState(false);
  const sendOtpBtn = () => {
    sendOtpMail(Math.floor(Math.random() * 1000000), values.email);
    let sec = 30;
    setSendOtpBtnVal("Didn't receive OTP? Send Again");
    setdisableBtn(true);
    setTimeout(() => {
      setdisableBtn(false);
      clearInterval(interval);
      setSendOtpBtnVal("Send Again");
    }, sec * 1000);
    let i = sec;
    const interval = setInterval(() => {
      i--;
      setSendOtpBtnVal("Send again in " + i);
    }, 1000);
  };

  return (
    <>
      Email OTP Verification
      <FlexEvenly flexDirection={"column"}>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="standard"
            label={"Enter OTP here"}
            required
            type={"text"}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            fullWidth
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
            Verify
          </Button>
        </form>
        <Button disabled={disableBtn} onClick={() => sendOtpBtn()}>
          {sendOtpBtnVal}
        </Button>
      </FlexEvenly>
    </>
  );
};

export default EmailVerification;
