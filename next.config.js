require("dotenv").config();
module.exports = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_SPREADSHEET_ID: process.env.GOOGLE_SPREADSHEET_ID,
    GOOGLE_SPREADSHEET_RANGE: process.env.GOOGLE_SPREADSHEET_RANGE,
  },
};
