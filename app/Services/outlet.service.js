const MongooseService = require("./mongoose.service");
const OutletsModel = require("../models/outlet.models");
const StationsService = require("./stations.service");
const StationsServiceInstance = new StationsService();
const upload = require("../middleware/uploads");
const PhotoTypeModel = require("../models/photos.models");
const _ = require("lodash");

class OutletService {
  constructor() {
    this.MongooseServiceInstance = new MongooseService(OutletsModel);
  }

  async createOutlet(req, res) {
    try {
      await upload(req, res);

      let postToCreateData = JSON.parse(req.body.outletInfo);
      if (req.files.length > 0) {
        _.each(req.files, function (eachFile) {
          if (eachFile.contentType === 'image/jpeg') {
            postToCreateData.Logo_Id = eachFile.id;
          }
          else if (eachFile.contentType === 'application/pdf') {
            postToCreateData.NutriDocument_Id = eachFile.id;
          }
        })
      }
      postToCreateData.Prepaid = true;
      const resultUpdate = await this.MongooseServiceInstance.create(
        postToCreateData
      );
      return { success: true, body: resultUpdate };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getAllOutlets() {
    try {
      // let query = { isDelete: false };
      let populateQuery = [
        { path: "VendorId", select: "PANNumber MobileNumber VendorName" },
        { path: "Station_Id", select: "StationName" },
        { path: "Logo_Id", select: "filename" },
        { path: "NutriDocument_Id", select: "filename" }
      ];
      const result = await OutletsModel.find()
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

  async getOutletsByUserId(id) {
    try {
      let query = { user_Id: id };
      let populateQuery = [
        { path: "VendorId", select: "EmailID PANNumber MobileNumber VendorName" },
        { path: "Station_Id", select: "StationName" },
        { path: "Logo_Id", select: "filename" },
        { path: "NutriDocument_Id", select: "filename" }
      ];
      const result = await OutletsModel.find(query)
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

  async getOutletsByStationCode(code) {
    try {

      const stationObject = await StationsServiceInstance.getStationsByStationCode(code);
      if (stationObject.success) {
        let query = { Station_Id: stationObject.body[0]._id,isActive:true };
        let populateQuery = [
          { path: "Logo_Id", select: "filename" }
        ];
        const result = await OutletsModel.find(query)
          .populate(populateQuery)
          .then((result) => {
            return result;
          })
          .catch((err) => {
            console.log(err);
          });
        return { success: true, body: result };
      }
      else {
        return { success: false, error: `No Stations found with station code ${code}` };
      }
    } catch (err) {
      return { success: false, error: err };

    }
  }

  async getOutletsDD() {
    try {
      let query = { isDelete: false };

      const result = await OutletsModel.find(query)
        .select("OutletName _id")
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

  async updateOutletData(id, query) {
    try {
      const result = await this.MongooseServiceInstance.update(id, query);
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = OutletService;
