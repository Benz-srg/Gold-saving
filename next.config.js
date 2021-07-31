const { model } = require("mongoose");
module.exports = {
  env: {
    MONGO_URI:
      "mongodb+srv://ekkasit:Benz4334#@cluster0.46mmv.mongodb.net/Gold_saving?retryWrites=true&w=majority",
    // NODE_ENV: "production",
    SECRET_COOKIE_PASSWORD: "2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8",
  },
  webpack: function (c) {
    if (c.resolve.alias) {
      delete c.resolve.alias["react"];
      delete c.resolve.alias["react-dom"];
    }
    return c;
  },
};

