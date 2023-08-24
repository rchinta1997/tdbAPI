const mongoose = require("mongoose");

const AppSchema = mongoose.Schema(
  {
    CuisineType:{type:String,required:true},
    isActive: { type: Boolean, required: true, default: true },
    isDelete: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CuisineMaster", AppSchema, "CuisineMaster");
