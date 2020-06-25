import * as devKeys from "./dev";

export const getKeys = () => {
  if (process.env.NODE_ENV === "production") {
    //module.exports = require('./prod');
  } else if (process.env.NODE_ENV === "development") {
    return devKeys.default;
  } else {
    return devKeys.default;
  }
};
