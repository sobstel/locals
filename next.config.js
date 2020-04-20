require("dotenv").config();
module.exports = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACESS_KEY: process.env.SECRET_ACESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
  },
};
