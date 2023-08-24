const mongoose = require("mongoose");

const userTypesSchema = mongoose.Schema(
  {
    UserType: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserTypes", userTypesSchema, "UserTypes");
