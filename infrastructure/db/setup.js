// NOTE: For test and development - use dotenv to setup env vars
/* eslint-disable global-require */
if (["test", "development"].includes(process.env.NODE_ENV)) {
  const path = require("path");
  require("dotenv").config({
    path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
  });
}
/* eslint-enable global-require */

const setupLocalDb = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL env var is missing. You can provide it directly or set up a .env file."
    );
  }

  return process.env.DATABASE_URL;
};

module.exports = {
  setupLocalDb
};
