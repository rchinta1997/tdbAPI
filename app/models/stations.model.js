const mongoose = require("mongoose");

const AppSchema = mongoose.Schema(
  {
    StationName: { type: String, required: true },
    StationCode: { type: String, required: true },
    isDelete: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    Created_By: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    Updated_By: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stations", AppSchema, "Stations");
