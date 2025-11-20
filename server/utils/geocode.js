const axios = require("axios");

const geocodeAddress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent": "NestoraApp/1.0 (deployserver7@gmail.com)"
    }
  });

  // Nominatim returns an ARRAY, not "results"
  if (!response.data || response.data.length === 0) {
    throw new Error("Invalid address. Cannot find coordinates.");
  }

  const result = response.data[0];

  return {
    latitude: result.lat,
    longitude: result.lon,
  };
};

module.exports = { geocodeAddress };
