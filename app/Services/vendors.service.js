const MongooseService = require("./mongoose.service");
const VendorModel = require("../models/vendor.models");
const UserModel = require("../models/user.model");
const UserTypeService = require("../Services/userType.service");
const UserTypeServiceInstance = new UserTypeService();
const UserService = require("../Services/user.service");

const config = require("../../config/database.config");
const hashMiddleWare = require("../Config/hash.middleware");
const hashMiddleWareInstance = new hashMiddleWare();
//var assert = require('assert');


const UserServiceInstance = new UserService();
const _ = require("lodash");

class VendorService {
  constructor() {
    this.MongooseServiceInstance = new MongooseService(VendorModel);  
  }

  async createVendor(postToCreate) {
    console.log("POST DATA",postToCreate)
    //return false;
    try {
      const userTypes = await UserTypeServiceInstance.getUserTypes();
      //console.log("User types", userTypes)
      if (userTypes.success) {
        let userTypeFilteredData = _.find(userTypes.body, function (obj) {
          if (obj.UserType === 'Vendor') {
            return true;
          }
        });

       
        let user = {
          emailID: postToCreate.vendorEmail,
          password: postToCreate.vendorPassword,
          mobileNumber: postToCreate.MobileNumber,
          userType_Id: userTypeFilteredData._id.toString(),
          isActive:true
        }

        const query = {
         userType_Id: user.userType_Id,
         emailID: user.emailID,
         isActive: true
        }

        const vendorDuplicateCheck = await UserServiceInstance.getUserByEmail(query);
        console.log("duplicat record",vendorDuplicateCheck)
      if (vendorDuplicateCheck.body == null) {
        console.log("User Data", user)
        //return query;
        const userResult = await UserServiceInstance.createUser(user);
        if (userResult.success) {
          let vendor = {
            VendorName: postToCreate.VendorName,
            MobileNumber: postToCreate.MobileNumber,
            PhoneNumber: postToCreate.PhoneNumber,
            PANNumber: postToCreate.PANNumber,
            Address: postToCreate.Address,
            user_Id: userResult.body._id.toString(),
            Station_Id: postToCreate.Station_Id,
            //vendorEmail: postToCreate.vendorEmail,
            //vendorPassword: postToCreate.vendorPassword,
            outletName: postToCreate.outletName
          }
          const result = await this.MongooseServiceInstance.create(vendor);
          return { success: true, body: result };
        }
        else {
          return userResult;
        }
      } else {
        return { success: false, msg: 'duplicate' };
      }

      }
      else {
        return userTypes;
      }
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getAllVendors() {
    try {
      let populateQuery = [
        { path: "user_Id", select:"_id emailID"}
      ];
      const result = await VendorModel.find({}).populate(populateQuery).sort({_id:-1}).limit(20)
      .then((result) => {
        console.log("result",result);
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

  async updateVendorData(id, query) {
    try {
      const result = await this.MongooseServiceInstance.update(id, query);
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

}

module.exports = VendorService;
