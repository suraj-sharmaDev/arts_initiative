const mongoose = require("mongoose");

const projectDomainSchema = new mongoose.Schema(
  {
    domainUrl: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.projectDomain || mongoose.model("projectDomain", projectDomainSchema);
