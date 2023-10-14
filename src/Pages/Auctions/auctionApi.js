// Fetches data for ended auctions
export const getAuctionEndedData = async (startIndex, limit) => {
  const res = await fetch(
    `${process.env.REACT_APP_AUCTION_SERVER}/api/auction/get/ended/${startIndex}/${limit}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return data;
};

// Fetches data for upcoming auctions
export const getAuctionUpcomingData = async (startIndex, limit) => {
  const res = await fetch(
    `${process.env.REACT_APP_AUCTION_SERVER}/api/auction/get/upcoming/${startIndex}/${limit}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return data;
};

// Fetches data for ongoing auctions
export const getAuctionOnGoingData = async (startIndex, limit) => {
  const res = await fetch(
    `${process.env.REACT_APP_AUCTION_SERVER}/api/auction/get/ongoing/${startIndex}/${limit}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return data;
};

// Fetches auctions by a specific user, requiring an authentication token
export const get_auctions_by_user = async (token, startIndex, limit) => {
  const res = await fetch(
    `${process.env.REACT_APP_AUCTION_SERVER}/api/auction/get/${startIndex}/${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  if (data?.msg) {
    alert(data.msg);
    return null;
  }
  return data;
};

// Sends a request to start a new auction
export const startNewAuction = async (values, token) => {
  // console.log(token);
  const savedResponse = await fetch(
    `${process.env.REACT_APP_AUCTION_SERVER}/api/auction/add/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const res = await savedResponse.json();
  alert(res.msg);
  return res;
};
