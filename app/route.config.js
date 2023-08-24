const UserController = require("./controllers/user.controller.js");
const StationsController = require("./controllers/stations.controller.js");
const VendorsController = require("./controllers/vendor.controller.js");
const OutletController = require("./controllers/outlet.controller.js");
const MenuItemsController = require("./controllers/menuItem.controller.js");
const IrctcRequestController = require("./controllers/IrctcRequest.controller.js");
const UploadsController = require("./controllers/uploads.controller")
const CuisineController = require("./controllers/cuisine.controller")
const FoodTypeController = require("./controllers/foodType.controller")
const OrdersController = require("./controllers/orders.controller");
const { authorize } = require("./Config/auth.middleware");
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage })


module.exports = (app) => {
  //#region Users
  app.post("/user/create", UserController.createUser);
  app.get("/user/getuserInfo/:userId", UserController.getUserById);
  app.post("/user/authenticate", UserController.authenticate);
  app.get("/user/getConsumers", UserController.getConsumers);
  //#endregion

  //#region Stations Routes
  app.post("/stations/create", authorize, StationsController.createStation);
  app.put(
    "/stations/update/:stationId",
    authorize,
    StationsController.updateStation
  );
  app.get(
    "/stations/getStationsByID/:stationId",
    authorize,
    StationsController.getStationsByID
  );
  app.get(
    "/stations/getAllStations",
    authorize,
    StationsController.getAllStations
  );
  //#endregion

  //#region Vendors
  app.post("/vendors/create", VendorsController.createVendor);
  app.get("/vendors/getAllVendors", VendorsController.getAllVendors);
  app.put("/vendors/update/:vendorId", VendorsController.updateVendor);
  //#endregion

  //#region  Outlets
  app.post("/Outlets/create", authorize, OutletController.createOutlet);
  app.get("/Outlets/getAllOutlets", authorize, OutletController.getAllOutlets);
  app.get("/Outlets/getOutletsByUserId/:vendorId", authorize, OutletController.getOutletsByUserId);
  app.get("/Outlets/getOutletsByStationCode/:stationCode", OutletController.getOutletsByStationCode);
  app.get("/Outlets/getOutletsDD", authorize, OutletController.getOutletsDD);
  app.put(
    "/Outlets/update/:outletId",
    authorize,
    OutletController.updateOutletData
  );
  //#endregion

  //#region  MenuItems
  app.post("/MenuItems/create", MenuItemsController.createMenuItems);
  app.get(
    "/MenuItems/getMenuItemsByOutlet/:outletId",
    MenuItemsController.getMenuByOutlet
  );
  app.post(
    "/MenuItems/createBulk/:outletId",
    authorize,
    MenuItemsController.createBulkMenuItems
  );
  //#endregion

  //#region IRCTCRequest
  app.get(
    "/Irctc/searchByPNR/:pnr",
    IrctcRequestController.searchByPNR
  );
  app.post("/upload", UploadsController.uploadFiles);
  app.get("/files", UploadsController.getListFiles);
  app.get("/files/:name", UploadsController.download);
  //#endregion


  //#region  Cusine Types
  app.post("/cusine/create", CuisineController.createCuisineType);
  app.get("/cuisine/getAllCuisineTypes", CuisineController.getCuisineMaster);
  //#endregion

  //#region  Food Types
  app.post("/foodtype/create", FoodTypeController.createFoodType);
  app.get("/foodtype/getAllFoodTypes", FoodTypeController.getFoodTypesMaster);
  //#endregion

  //#region  Order
  app.post("/order/createOrder",OrdersController.createOrder )
  app.get("/order/getAllOrders",OrdersController.getAllOrders )
  //#endregion
};
