const MongooseService = require("./mongoose.service");
const StationsModel = require("../models/stations.model");
const mapper = require("automapper-js");
const StationsModelObj = require("../modelObjects/stations.model.object");
const transporter= require("../../config/mailtransporter.config");
//import _ from "lodash";

class StationsService {
  constructor() {
    this.MongooseServiceInstance = new MongooseService(StationsModel);
  }

  async createStation(postToCreate, userObj) {
    try {
      let queryStnCode = { StationCode: postToCreate.StationCode };
      const result = await this.MongooseServiceInstance.find(queryStnCode);
      if (result.length > 0) {
        if (result[0].isDelete) {
          let queryDelete = {
            isDelete: false,
            StationName: postToCreate.StationName,
          };
          const resultDelete = await this.MongooseServiceInstance.update(
            result[0]._id,
            queryDelete
          );
          return { success: true, body: resultDelete };
        } else {
          return { success: false, error: "Station Code Already Exists" };
        }
      } else {
        postToCreate.Created_By = userObj.id;
        const resultUpdate = await this.MongooseServiceInstance.create(
          postToCreate
        );
        return { success: true, body: resultUpdate };
      }
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getStationsByID(id) {
    try {
      const result = await this.MongooseServiceInstance.findById(id);
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getStationsByStationCode(code) {
    try {
      let query={StationCode:code};
      const result = await this.MongooseServiceInstance.find(query);
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getAllStations() {
    try {
      let query = { isDelete: false };
      const result = await this.MongooseServiceInstance.find(query,{ "StationName" : "asc"});
      // const mailOptions = {
      //   from:"test@traindhaba.com",
      //   to:"manideep.b07@gmail.com",
      //   subject:"test",
      //   html:"<h1>Test</h1>"
      // }
      // await transporter.sendMail(mailOptions,function(err,info){
      //   if(err)
      //   {
      //     console.log(err);
      //   }
      // })
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async updateStationData(id, query) {
    try {
      const result = await this.MongooseServiceInstance.update(id, query);
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = StationsService;
