const MongooseService = require("./mongoose.service");
const MenuItemsModel = require("../models/MenuItems.models");
const CuisineModel = require("../models/cuisine.model");
const FoodTypeModel = require("../models/foodType.model");
const _ = require("lodash");
const { default: mongoose } = require("mongoose");
const upload = require("../middleware/uploads");
const PhotoTypeModel = require("../models/photos.models");
//const _ = require("lodash");



class MenuItemService {
  constructor() {
    this.MongooseServiceInstance = new MongooseService(MenuItemsModel);
    this.MongooseServiceCusineInstance = new MongooseService(CuisineModel);
    this.MongooseServiceFoodTypeInstance = new MongooseService(FoodTypeModel);
  }

  async createMenu(postToCreate) {
    try {
      console.log("req",req.body);
      const resultUpdate = await this.MongooseServiceInstance.create(
        postToCreate
      );
      return { success: true, body: resultUpdate };
    } catch (err) {
      return { success: false, error: err };
    }
  }


  async createBulkMenuItems(id, query) {
    let modelObj = query.column;
    let cusineQuery = { isDelete: false };
    let cusineData = await this.MongooseServiceCusineInstance.find(cusineQuery);
    let foodTypeData = await this.MongooseServiceFoodTypeInstance.find(cusineQuery);

    console.log(modelObj);

    for (let index in modelObj) {
      let eachObj=modelObj[index];
      //eachObj.Outlet_Id = re
      let cusineFilteredData = _.find(cusineData, function (obj) {
        if (obj.CuisineType === eachObj.Cuisine) {
          return true;
        }
      });
      eachObj.Cuisine = cusineFilteredData._id.toString();
      let foodTypeFilteredData = _.find(foodTypeData, function (obj) {
        if (obj.FoodType === eachObj.Food_Type) {
          return true;
        }
      });
      eachObj.Food_Type = foodTypeFilteredData._id.toString();
      const result = await this.MongooseServiceInstance.create(eachObj);
    }
    try {

      return { success: true, body: modelObj };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getMenuByOutlet(Outlet_id) {
    try {
      
      let populateQuery = [
        { path: "Outlet_Id", select:"OutletName"},
        { path: "Cuisine", select: "CuisineType" },
        { path: "Food_Type", select: "FoodType" }
      ];
      const result = await MenuItemsModel.find({ Outlet_Id: Outlet_id })
        .populate(populateQuery)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          console.log(err);
        });
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getFoodTypesCuisineTypes() {
    try {
      let response = [];
      let cusineQuery = { isDelete: false };
      let cusineData = await this.MongooseServiceCusineInstance.find(cusineQuery);
      let foodTypeData = await this.MongooseServiceFoodTypeInstance.find(cusineQuery);
      //console.log("cuisine types",cusineData);
      //console.log("food types",foodTypeData);
      //response['food_types'] = foodTypeData;
      //response['cuisine_types'] = cusineData;
      //console.log("Response", response);
      let response_data = {
        "food_types":foodTypeData,
        "cuisine_types":cusineData
      }
      return { success: true, body: response_data };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async createMenuItem(req,res) {
    console.log("block1", req.body)
    try {
     
      await upload(req, res);
      console.log("block3",req.body)
      let postToCreateData = JSON.parse(req.body.menuInfo);
      console.log("postToCreateData",postToCreateData);
      console.log("MenuPost Data",postToCreateData);
      if (req.files.length > 0) {
        _.each(req.files, function (eachFile) {
          if (eachFile.contentType === 'image/jpeg') {
            postToCreateData.Logo_Id = eachFile.id;
          }
        })
      }
      console.log("block4")
      let menuItem = {
        Outlet_Id: postToCreateData.Outlet_Id,
        VendorId: postToCreateData.VendorId,
        Is_Non_Vegetarian: (postToCreateData.Cat_Type == 'non-veg'?true:false),
        Is_Vegetarian: (postToCreateData.Cat_Type == 'veg'?true:false),
        Item_Name: postToCreateData.Item_Name,
        Base_Price: postToCreateData.Base_Price,
        Selling_Price: postToCreateData.Selling_Price,
        Description: postToCreateData.Description,
        Allergen_Info: postToCreateData.Allergen_Info,
        Calories: postToCreateData.Calories,
        Food_Type: postToCreateData.Food_Type,
        Cuisine: postToCreateData.Cuisine,
        Logo_Id: postToCreateData.Logo_Id,
        Opening_Time: postToCreateData.Opening_Time,
        Closing_Time: postToCreateData.Closing_Time,
        isActive: postToCreateData.isActive,
        isGST:postToCreateData.isGST
      }

      console.log("menu data",menuItem)

      const resultUpdate = await this.MongooseServiceInstance.create(
        menuItem
      );
      return { success: true, body: resultUpdate };
    } catch (err) {
      console.log(err);
      return { success: false, error: err };
    }
  }

  async getMenuItemsList() {
    try {
      
      let populateQuery = [
        { path: "Outlet_Id", select:"OutletName"},
        { path: "Cuisine", select: "CuisineType" },
        { path: "Food_Type", select: "FoodType" }
      ];
      const result = await MenuItemsModel.find({})
        .populate(populateQuery)
        .limit(300)
        .sort({_id:-1})
        .select({Item_Name:1,
          Item_Price:1,
          Description:1,
          Allergen_Info:1,
          Opening_Time:1,
          Closing_Time:1,
          Is_Vegetarian:1,
          Is_Non_Vegetarian:1
        })
        .then((result) => {
          return result;
        })
        .catch((err) => {
          console.log(err);
        });
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }


}

module.exports = MenuItemService;
