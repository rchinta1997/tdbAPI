const mongoose = require("mongoose");

const MenuItemsSchema = mongoose.Schema(
  {
    Outlet_Id: { type: mongoose.Schema.Types.ObjectId, ref: "Outlets" },
    Item_Name: { type: String, required: true },
    Description: { type: String },
    Logo_Id: { type: mongoose.Schema.Types.ObjectId, ref: "photos.files" },
    //Item_Price: { type: String, required: false },
    Base_Price: { type: String, required: true },
    Tax: { type: String, required: false },
    Selling_Price: { type: String, required: false },
    Is_Vegetarian: { type: Boolean, required: true },
    Is_Non_Vegetarian: { type: Boolean, required: true },
    Tags: { type: String },
    Options: { type: String },
    Base_Option: { type: String },
    //Is_available: { type: Boolean, required: false },
    Cuisine: { type: mongoose.Schema.Types.ObjectId, ref: "CuisineMaster" },
    Calories: { type: String },
    Allergen_Info: { type: String },
    Food_Type: { type: mongoose.Schema.Types.ObjectId, ref: "FoodTypeMaster" },
    New_Item_Price: { type: String },
    Opening_Time: { type: String },
    Closing_Time: { type: String },
    VendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendors" },
    isDelete: { type: Boolean,default:false},
    isActive: { type: Boolean },
    isGST: {type: Boolean}
  },
  { timestamps: true }
);

MenuItemsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("MenuItems", MenuItemsSchema, "MenuItems");
