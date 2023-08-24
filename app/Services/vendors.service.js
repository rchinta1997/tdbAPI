const MongooseService = require("./mongoose.service");
const VendorModel = require("../models/vendor.models");
const UserTypeService = require("../Services/userType.service");
const UserTypeServiceInstance = new UserTypeService();
const UserService = require("../Services/user.service");
const UserServiceInstance = new UserService();
const _ = require("lodash");

class VendorService {
  constructor() {
    this.MongooseServiceInstance = new MongooseService(VendorModel);
  }

  async createVendor(postToCreate) {
    try {
      const userTypes = await UserTypeServiceInstance.getUserTypes();
      if (userTypes.success) {
        let userTypeFilteredData = _.find(userTypes.body, function (obj) {
          if (obj.UserType === 'Vendor') {
            return true;
          }
        });
        //postToCreate.Password = await hashMiddleWareInstance.encrypt(postToCreate.Password);
        let user = {
          emailID: postToCreate.EmailID,
          password: postToCreate.Password,
          mobileNumber: postToCreate.MobileNumber,
          userType_Id: userTypeFilteredData._id.toString()
        }
        const userResult = await UserServiceInstance.createUser(user);
        if (userResult.success) {
          let vendor = {
            VendorName: postToCreate.VendorName,
            MobileNumber: postToCreate.MobileNumber,
            PhoneNumber: postToCreate.PhoneNumber,
            PANNumber: postToCreate.PANNumber,
            Address: postToCreate.Address,
            user_Id: userResult.body._id.toString()
          }
          const result = await this.MongooseServiceInstance.create(vendor);
          return { success: true, body: result };
        }
        else {
          return userResult;
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
        { path: "user_Id", select:"emailID"}
      ];
      const result = await VendorModel.find({}).populate(populateQuery)
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
