const axios = require("axios");

const getInstance = (token) => {
  return axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });
};
module.exports = getInstance;
