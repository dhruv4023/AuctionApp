// Import the 'setLogin' function from the 'state' module
import { setLogin } from "state";

// Function to register a user
export const register = async (values) => {
  // Create a new FormData object to prepare data for the POST request.
  const formData = new FormData();

  // Check if the 'picPath' field is empty and remove it if so.
  if (values["picPath"] === "") {
    delete values["picPath"];
  }

  // Append data from the 'values' object to the 'formData' object.
  appendData(formData, values);

  // Send a POST request to the registration endpoint on the server.
  const savedUserResponse = await fetch(
    `${process.env.REACT_APP_AUTH_SERVER}/auth/register`,
    {
      method: "POST",
      body: formData,
    }
  );

  // Parse the response from the server as JSON.
  const res = await savedUserResponse.json();

  // Display an alert message to the user based on the server's response.
  alert(res.msg);
};

// Function to log in a user
export const login = async (values, dispatch, setLogin, navigate) => {
  const loggedInResponse = await fetch(
    `${process.env.REACT_APP_AUTH_SERVER}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const loggedIn = await loggedInResponse.json();
  if (loggedIn.exist) {
    dispatch(
      setLogin({
        user: loggedIn.user,
        token: loggedIn.token,
      })
    );
    navigate(`/profile/${loggedIn.user.username}`);
  } else {
    alert(loggedIn.mess);
  }
};

// Function to change a user's password
export const changePass = async (values) => {
  const changePassResponse = await fetch(
    `${process.env.REACT_APP_AUTH_SERVER}/auth/changepass`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const savedUser = await changePassResponse.json();
  alert(savedUser.msg);
};

// Function to get user names
export const getUserNames = async (setUserNames) => {
  const res = await fetch(
    `${process.env.REACT_APP_AUTH_SERVER}/auth/usernames`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  setUserNames(data);
};

// Function to update a user's profile
export const updateProfile = async (values, dispatch, token, navigate) => {
  const formData = new FormData();
  appendData(formData, values);
  if (values["picPath"] === "") delete values["picPath"];
  const savedUserResponse = await fetch(
    `${process.env.REACT_APP_AUTH_SERVER}/auth/update/${values.username}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }
  );
  const savedUser = await savedUserResponse.json();
  if (savedUser.user) {
    dispatch(
      setLogin({
        user: savedUser.user,
        token: token,
      })
    ) && navigate(`/profile/${savedUser.user.username}`);
  } else {
    alert(savedUser);
  }
};
/**
 * Recursively appends data to a FormData object.
 * @param {FormData} formData - The FormData object to append data to.
 * @param {object} object - The data object to append.
 * @param {string} parentKey - The parent key (used for nested objects).
 */
function appendData(formData, object, parentKey) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;

      // Check if the value is an object and not an instance of File.
      if (typeof object[key] === "object" && !(object[key] instanceof File)) {
        // Recursively append nested object data.
        appendData(formData, object[key], currentKey);
      } else {
        // Append the current key-value pair to the FormData object.
        formData.append(currentKey, object[key]);
      }
    }
  }
}

/***************************************** */

/**
 * Sends an email with an OTP (One-Time Password) to the specified email address.
 * @param {string} email - The recipient's email address.
 * @param {string} otp - The One-Time Password to send.
 */
export const sendMail = async (email, otp) => {
  // Send a POST request to the server's email endpoint with email and OTP data.
  const res = await fetch(`${process.env.REACT_APP_AUTH_SERVER}/mail/sendotp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  // Parse the response from the server as JSON.
  const msg = await res.json();

  // Display an alert message to the user based on the server's response.
  alert(msg.msg);
};
