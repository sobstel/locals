require("dotenv").config();
module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    AMZ_ACCESS_KEY: process.env.AMZ_ACCESS_KEY,
    AMZ_SECRET_KEY: process.env.AMZ_SECRET_KEY,
    AMZ_REGION: process.env.AMZ_REGION,
    MAILER: process.env.MAILER,
    MG_HOST: process.env.MG_HOST,
    MG_API_KEY: process.env.MG_API_KEY,
    MG_DOMAIN: process.env.MG_DOMAIN,
  },
};
