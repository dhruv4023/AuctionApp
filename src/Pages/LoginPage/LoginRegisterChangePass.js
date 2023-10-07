import { setLogin } from "state";

export const register = async (values) => {
  const formData = new FormData();
  if(values["picPath"]==="") delete values["picPath"];
  appendData(formData, values);
  const savedUserResponse = await fetch(
    `${process.env.REACT_APP_AUTH_SERVER}/auth/register`,
    {
      method: "POST",
      body: formData,
    }
  );
  const res = await savedUserResponse.json();
  alert(res.msg);
};

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

export const changePass = async (values) => {
  // console.log(values);
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

// export const getUserNames = async (setUserNames, user) => {
export const getUserNames = async (setUserNames) => {
  const res = await fetch(`${process.env.REACT_APP_AUTH_SERVER}/auth/usernames`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  setUserNames(data);
  // setUserNames(user ? data.filter((f) => f !== user.username) : data);
};

export const updateProfile = async (values, dispatch, token, navigate) => {
  const formData = new FormData();
  appendData(formData, values);
  if(values["picPath"]==="") delete values["picPath"];
  // console.log(values);
  const savedUserResponse = await fetch(
    `${process.env.REACT_APP_AUTH_SERVER}/auth/update/${values.username}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }
  );
  const savedUser = await savedUserResponse.json();
  // console.log(savedUser);
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

function appendData(formData, object, parentKey) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof object[key] === "object" && !(object[key] instanceof File)) {
        appendData(formData, object[key], currentKey);
      } else {
        formData.append(currentKey, object[key]);
      }
    }
  }
}

/***************************************** */

export const sendMail = async (email, otp) => {
  // console.log(values);
  const res = await fetch(`${process.env.REACT_APP_AUTH_SERVER}/mail/sendotp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  const msg = await res.json();
  alert(msg.msg);
};
