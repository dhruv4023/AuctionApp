import app from "./firebaseConfig";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
const auth = getAuth(app);
const fun = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "sign-in-button",
    {
      size: "invisible",
      callback: (response) => {
        // console.log(response)
      },
    },
    auth
  );
};

export const sendOtp = (phoneNumber) => {
  fun();
  const pn = "+91" + phoneNumber;
  // console.log(pn);
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, pn, appVerifier)
    .then((confirmationResult) => {
      // console.log("sent");
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    })
    .catch((error) => {
      console.error(error);
      // Error; SMS not sent
      // ...
    });
};
export const verifyOtp = (otp, setVerified) => {
  const code = otp;
  // console.log(window.confirmationResult)
  window.confirmationResult
    .confirm(code)
    .then((result) => {
      // User signed in successfully.
      const user = result.user;
      // user.phoneNumber;
      setVerified(1);
    })
    .catch((error) => {
      setVerified(-1);
      console.error(error);
      // User couldn't sign in (bad verification code?)
      // ...
    });
};
