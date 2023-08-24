const MongooseService = require("./mongoose.service");
const FoodTypeModel = require("../models/foodType.model");

class FoodTypeService {
    constructor() {
        this.MongooseServiceInstance = new MongooseService(FoodTypeModel);
    }

    async createFoodType(req, res) {
        try {
            const resultUpdate = await this.MongooseServiceInstance.create(
                req
            );
            return { success: true, body: resultUpdate };
        } catch (err) {
            return { success: false, error: err };
        }
    }

    async getFoodTypesMaster() {
        try {
            let query = { isDelete: false };
            const result = await this.MongooseServiceInstance.find(query);
            return { success: true, body: result };
        } catch (err) {
            return { success: false, error: err };
        }
    }
}

module.exports = FoodTypeService;