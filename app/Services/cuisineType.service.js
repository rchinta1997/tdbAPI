const MongooseService = require("./mongoose.service");
const CuisineModel = require("../models/cuisine.model");

class CusineTypeService {
    constructor() {
        this.MongooseServiceInstance = new MongooseService(CuisineModel);
    }

    async createCuisineType(req, res) {
        try {
            const resultUpdate = await this.MongooseServiceInstance.create(
                req
            );
            return { success: true, body: resultUpdate };
        } catch (err) {
            return { success: false, error: err };
        }
    }

    async getCuisineMaster() {
        try {
            let query = { isDelete: false };
            const result = await this.MongooseServiceInstance.find(query);
            return { success: true, body: result };
        } catch (err) {
            return { success: false, error: err };
        }
    }
}

module.exports = CusineTypeService;