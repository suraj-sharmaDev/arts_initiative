const mongoose = require("mongoose");

const firebaseTokensSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.firebaseToken || mongoose.model("firebaseToken", firebaseTokensSchema);
