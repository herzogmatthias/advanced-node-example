import * as ciKeys from "./ci";

export const getKeys = () => {
  if (process.env.NODE_ENV === "production") {
    //module.exports = require('./prod');
  } else if (process.env.NODE_ENV === "development") {
    const devKeys = require("./dev");
    return devKeys.default;
  } else {
    return ciKeys.default;
  }
};
