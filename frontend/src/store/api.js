const axios = require("axios");
export default axios.create({
  baseURL: "http://localhost:3000/", // Set a base URL for requests
  timeout: 10000, // Set a timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json", // Set default headers
    // You can add other default headers here
  },
});
