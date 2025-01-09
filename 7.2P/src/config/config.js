const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  dbUrl: process.env.MONGO_URI,
  port: process.env.PORT || 3000,
};
