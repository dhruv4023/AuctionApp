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
