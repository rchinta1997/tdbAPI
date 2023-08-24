const MongooseService = require("./mongoose.service");
const UserTypeModel = require("../models/UserTypes.models");



class UserTypeService {
    constructor() {
        this.MongooseServiceInstance = new MongooseService(UserTypeModel);
    }

    async getUserTypes() {
        try {
            const result = await this.MongooseServiceInstance.find();
            return { success: true, body: result };
        } catch (err) {
            return { success: false, error: err };
        }
    }
}

module.exports = UserTypeService;
