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
export const get_auctions_by_user = async (token,startIndex, limit) => {
  // console.log(token)
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

export const startNewAuction = async (values) => {
  const savedResponse = await fetch(
    `${process.env.REACT_APP_AUCTION_SERVER}/api/auction/add/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const res = await savedResponse.json();
  alert(res.msg);
  return res;
};
