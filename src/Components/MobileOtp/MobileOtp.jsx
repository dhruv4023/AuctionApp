import { useTheme } from "@emotion/react";
import { Button, FormLabel, TextField, Tooltip } from "@mui/material";
import FlexEvenly from "Components/FlexEvenly";
import { sendOtp, verifyOtp } from "Components/MobileOtp/mobileOtpFuns";
import React, { useState } from "react";

const VerifyMobilePan = ({ mobileNo, setVerified, btnValue }) => {
  const theme = useTheme();
  const [otp, setOtp] = useState(0);
  const [sendotpAgain, setSendotpAgain] = useState(false);
  // useEffect(() => {
  //   sendOtp(mobileNo); // to sent otp
  // }, [sendotpAgain]);
  // if (sendotpAgain) {
  // setSendotpAgain(false);
  // sendOtp(mobileNo);
  // }
  const handleOtpVerify = (e) => {
    e.preventDefault();
    verifyOtp(otp, setVerified);
  };
  return (
    <>
      Mobile OTP Verification
      <FlexEvenly flexDirection={"column"}>
        <FormLabel>Your Mobile Number : {mobileNo} </FormLabel>
        <Tooltip title="enter 6 digit OTP">
          <TextField
            variant="standard"
            label={"Enter OTP here"}
            required
            type={"text"}
            error={String(otp).length !== 6 && String(otp).length > 1}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Tooltip>
        <Button
          fullWidth
          disabled={String(otp).length !== 6}
          type="submit"
          onClick={handleOtpVerify}
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.alt,
            "&:hover": { color: theme.palette.primary.main },
          }}
        >
          {btnValue}
        </Button>
        <Button
          disabled={sendotpAgain}
          onClick={() => {
            // setCapchaRender(!capchaRender);
            setSendotpAgain(true);
            sendOtp(mobileNo);
          }}
        >
          Sent Otp
        </Button>
      </FlexEvenly>
    </>
  );
};

export default VerifyMobilePan;
