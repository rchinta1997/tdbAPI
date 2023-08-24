const mongoose = require("mongoose");

const OrdersStatusMasterSchema = mongoose.Schema(
  {
    OrderStatus:{type:String,required:true},
    isActive: { type: Boolean, required: true, default: true },
    isDelete: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderStatusMaster", OrdersStatusMasterSchema, "OrderStatusMaster");
