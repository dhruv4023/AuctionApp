export const getUser = async (setUser, UID, navigate) => {
  const res = await fetch(`${process.env.REACT_APP_AUTH_SERVER}/user/get/${UID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  data ? setUser(data) : navigate("/404", { state: "Profile Not Found" });
  return data;
};

export const getFilteredData = async (values) => {
  const res = await fetch(
    `${process.env.REACT_APP_AUTH_SERVER}/service/getfiltereddata`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  return await res.json();
};
