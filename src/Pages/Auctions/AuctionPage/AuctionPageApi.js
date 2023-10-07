// This function fetches auction data by its ID from the server
export const get_auction_data_by_ID = async (auction_id) => {
  // Construct the URL for the HTTP GET request using the provided auction ID
  const res = await fetch(
    `${process.env.REACT_APP_AUCTION_SERVER}/api/auction/get/oneaux/${auction_id}`,
    {
      // Specify the request method as "GET"
      method: "GET",
      // Set the "Content-Type" header to indicate JSON format
      headers: { "Content-Type": "application/json" },
    }
  );
  // Wait for the response from the server
  const data = await res.json(); // Parse the response data as JSON
  // Return the auction data as a JavaScript object
  return data;
};
