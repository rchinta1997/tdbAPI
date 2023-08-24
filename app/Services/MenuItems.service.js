const MongooseService = require("./mongoose.service");
const MenuItemsModel = require("../models/MenuItems.models");
const CuisineModel = require("../models/cuisine.model");
const FoodTypeModel = require("../models/foodType.model");
const _ = require("lodash");
const { default: mongoose } = require("mongoose");


class MenuItemService {
  constructor() {
    this.MongooseServiceInstance = new MongooseService(MenuItemsModel);
    this.MongooseServiceCusineInstance = new MongooseService(CuisineModel);
    this.MongooseServiceFoodTypeInstance = new MongooseService(FoodTypeModel);
  }

  async createMenu(postToCreate) {
    try {
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
}

module.exports = MenuItemService;
