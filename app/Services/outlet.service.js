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
      
      console.log("res.body1", res.body);
      await upload(req, res);

      console.log("POST DATA",req.body)

      let postToCreateData = JSON.parse(req.body.outletInfo);
      console.log("postToCreateData",postToCreateData.VendorId)
      const query = {
        OutletName: postToCreateData.OutletName,
        VendorId: postToCreateData.VendorId,
        isActive: true
       }
       try{
       const resultdata = await this.MongooseServiceInstance.find(query);      
        console.log("duplicat record",resultdata)

       if(resultdata.length == 0)
       {
        console.log("if",resultdata)
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
              return { success: true, body: resultUpdate}; 
       }
       else
       {
        console.log("=====else=========")
        return { success: false, msg: 'duplicate' };
       }

       }catch(e)
       {        
        console.log("exception=",e)
        return { success: false, error: e };
       }

      return { success: true, body: resultUpdate}; 
    } catch (err) {
      console.log(err);
      return { success: false, error: err };
    }
  }

  async createOutletWithoutDuplicateOutletName(req, res) {
    try {
      console.log("req.body",req.body);
     
    
       let postToCreateData = JSON.parse(req.body.outletInfo);
       console.log("postToCreateData",postToCreateData.VendorId)
       console.log("postToCreateData",postToCreateData);
       const query = {
        OutletName: postToCreateData.OutletName,
        VendorId: postToCreateData.VendorId,
        isActive: true
       }
       const outletResult = await this.MongooseServiceInstance.find(query);  
        console.log("duplicat record",outletResult)
      if (outletResult.body.length === 0 || outletResult.body == null) {
            try {
              await upload(req, res);
          } catch(e) {
              console.log(e);
            
          }
            console.log("POST DATA",req.body.files)
            if (req.body.files.length > 0) {
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
    } else {
      return { success: false, msg: 'duplicate' };
    }

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

  async getOutletsByVendorId(id) {
    try {
      let query = { VendorId: id };
      console.log("Vendor ID:",id)
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

  async duplicate_outlet_check(query) {
    try {
      //let query = { isDelete: false };
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

}



module.exports = OutletService;
