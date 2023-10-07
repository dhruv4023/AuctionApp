import { useTheme } from "@emotion/react";
import { Button, TextField } from "@mui/material";
import emailjs from "@emailjs/browser";
import FlexEvenly from "Components/FlexEvenly";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { register, sendMail, updateProfile } from "./LoginRegisterChangePass";
import { useDispatch, useSelector } from "react-redux";
const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const values = location.state;
  // console.log(values)
  // console.log(location)
  const { palette } = useTheme();
  useEffect(() => {
    !values && navigate("/", { state: null });
  });
  const [sentOtp, setSentOtp] = useState();
  //;
  // const sentMail = () => {
  //   console.log(sentOTP);
  // };
  // console.log(values)
  const token = useSelector((s) => s.token);
  const [otp, setOtp] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(otp, sentOtp);
    if (String(otp).trim() === String(sentOtp)) {
      if (values?.page === "changepass") {
        navigate("/changepass", {
          state: { email: values.email, page: "makenewpass" },
        });
      } else if (!values._id) {
        register(values, dispatch, navigate);
        navigate("/login", { state: null });
      } else {
        updateProfile(values, dispatch, token, navigate);
      }
    } else {
      alert("Invalid OTP");
    }
  };
  const sendOtpMail = (otpnum, to_mail) => {
    setSentOtp(otpnum);
    sendMail(to_mail, otpnum);
    // console.log(otpnum, to_mail);
    // emailjs
    //   .send(
    //     process.env.REACT_APP_MAIL_VERIFY_SERVICE_ID,
    //     process.env.REACT_APP_MAIL_VERIFY_TEMPLATE_ID,
    //     {
    //       name: "dhruv",
    //       otp: otpnum,
    //       email: to_mail,
    //     },
    //     process.env.REACT_APP_MAIL_VERIFY_PUBLIC_ID
    //   )
    //   .catch((e) => {
    //     // console.log(e);
    //     alert("Somethings wents wrong Plz Try again later !");
    //   });
  };
  const [sendOtpBtnVal, setSendOtpBtnVal] = useState("Click here to Send OTP");
  const [disableBtn, setdisableBtn] = useState(false);
  const sendOtpBtn = () => {
    sendOtpMail(Math.floor(Math.random() * 1000000), values.email);
    let sec = 30;
    setSendOtpBtnVal("didn't received OTP ? send Again ");
    setdisableBtn(true);
    setTimeout(() => {
      setdisableBtn(false);
      clearInterval(interval);
      setSendOtpBtnVal("Again send");
    }, sec * 1000);
    let i = sec;
    const interval = setInterval(() => {
      i--;
      setSendOtpBtnVal("again send in " + i);
    }, 1000);
  };
  // useEffect(() => {
  //   sendOtpBtn();
  // }, [])

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
