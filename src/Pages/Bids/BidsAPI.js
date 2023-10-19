// Function to retrieve auction data by its ID
export const get_auction_data_by_ID = async (auction_id) => {
  const res = await fetch(
    `${process.env.REACT_APP_AUCTION_SERVER}/api/auction/get/oneaux/${auction_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return data;
};

// Function to retrieve a list of bids for a specific auction, limited by startIndex and limit
export const get_bid_list_data = async (auction_id, startIndex, limit) => {
  const res = await fetch(
    `${process.env.REACT_APP_AUCTION_SERVER}/api/bids/get/${auction_id}/${startIndex}/${limit}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return data;
};

// Function to add a new bid to a specific auction
export const add_New_Bid = async (values, AID, token) => {
  
  const savedResponse = await fetch(
    `${process.env.REACT_APP_AUCTION_SERVER}/api/bids/add/${AID}`,
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
  // alert(res.msg); // Display a message to the user
  return res;
};
