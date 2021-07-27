const json = require('../config.json');

const config = {
  api_url: json.api,
  rs_url: json.recommender,
};

export default config;
