const MongooseService = require("./mongoose.service");
const UserModel = require("../models/outletUser.model");
const UserTypeModel = require("../models/UserTypes.models");
const UserTypeService = require("./userType.service");
const UserTypeServiceInstance = new UserTypeService();
const jwt = require("jsonwebtoken");
//require("dotenv").config();
const config = require("../../config/database.config");
const hashMiddleWare = require("../Config/hash.middleware");
const hashMiddleWareInstance = new hashMiddleWare();
var assert = require('assert');
const _ = require("lodash");
const { use } = require("../../config/mailtransporter.config");

class OutletUserService {
  constructor() {
    this.MongooseServiceInstance = new MongooseService(UserModel);
  }

  async createUser(postToCreate) {
    try {
      postToCreate.password = await hashMiddleWareInstance.encryptText(postToCreate.password);
      const result = await this.MongooseServiceInstance.create(postToCreate);
      delete result.password;
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async authenticate(postToCreate) {
    try {
      let user = { emailID: postToCreate.emailID };
      //let populateQuery = [{ path: "userType_Id" }];
      console.log("user",user);
      const result = await UserModel.find(user)
        //.populate(populateQuery)
        .then((result) => {
          console.log("result=",result);
          return result;
        })
        .catch((err) => {
          console.log(err);
        });
      if (result.length > 0) {
        let res=await hashMiddleWareInstance.decryptText(result[0].password);      
        console.log("decryptText=",res);
        if (res ===  postToCreate.password) {
          if (result[0].isActive) {
            const token = jwt.sign(
              {
                id: result[0]._id,
                emailID: result[0].emailID,
                //user_Type_Id: result[0].userType_Id._id,
                //user_Type: result[0].userType_Id.UserType,
              },
              config.Token_Key
            );
            let userObj = {
              token: token,
              id: result[0]._id,
              emailID: result[0].emailID,
              //user_Type_Id: result[0].userType_Id._id,
              //user_Type: result[0].userType_Id.UserType,
            };
            return { success: true, body: userObj };
          } else {
            return {
              success: false,
              error: "User is inActive, Please contact Admin",
            };
          }
        } else {
          return { success: false, error: "Invalid Password" };
        }
      } else {
        return { success: false, error: "User Not Found" };
      }
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async deleteUser(postToCreate) {
    try {
      const result = await this.MongooseServiceInstance.deleteUser(
        postToCreate
      );
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getUserByID(id) {
    try {
      const result = await this.MongooseServiceInstance.findById(id);
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getAllOutletUser() {
    try {
      let query = { isDelete: false };
      let populateQuery = [
        { path: "Outlet_Id", select: "OutletName" },
        //{ path: "VendorId", select: "VendorName" },
        //{ path: "Outlet_id", select: "StationName" },
        //{ path: "Logo_Id", select: "filename" },
        //{ path: "NutriDocument_Id", select: "filename" }
      ];
      console.log("========getAllOutletUser==========")
      const result = await UserModel.find(query)
      .populate(populateQuery).sort({createdAt:-1});
      console.log("result=",result)
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getUserByEmail(query) {
    try {
      const result = await this.MongooseServiceInstance.findOne(query);
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }
 
}

module.exports = OutletUserService;
