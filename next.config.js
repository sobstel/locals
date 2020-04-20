require("dotenv").config();
module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
};
