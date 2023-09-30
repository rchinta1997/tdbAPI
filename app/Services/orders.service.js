const Razorpay = require("razorpay");
const MongooseService = require("./mongoose.service");
const orderModel = require("../models/orders.model");
const usersModel = require("../models/user.model");
const orderItemsModel = require("../models/Order_Items.model");
const orderStatusModel = require("../models/OrdersStatusMaster.models");
const orderSourceModel = require("../models/OrdersSource.model");
const UserTypeService = require("../Services/userType.service");
const UserTypeServiceInstance = new UserTypeService();
const UserService = require("../Services/user.service");
const UserServiceInstance = new UserService();

const dayjs = require("../helpers/dayjs-helpers");
const lodash = require("lodash");
class OrderService {
  constructor() {
    this.MongooseServiceInstance = new MongooseService(orderModel);
    this.MongooseServiceUserInstance = new MongooseService(usersModel);
    this.MongooseServiceOrderStatusInstance = new MongooseService(
      orderStatusModel
    );
    this.MongooseServiceOrderSourceInstance = new MongooseService(
      orderSourceModel
    );
    this.MongooseServiceOrderItemsInstance = new MongooseService(
      orderItemsModel
    );
  }

  async createOrder(req, res) {
    try {
      let user_Id;
      let userQuery = { emailID: req.body.passegnerInfo.email };
      const userResult = await UserServiceInstance.getUserByEmail(userQuery);
      if (userResult.success && userResult.body != null) {
        let userRes = userResult.body;
        user_Id = userRes._id.toString();
      } else {
        const userTypes = await UserTypeServiceInstance.getUserTypes();
        if (userTypes.success) {
          let userTypeFilteredData = lodash.find(
            userTypes.body,
            function (obj) {
              if (obj.UserType === "User") {
                return true;
              }
            }
          );
          //postToCreate.Password = await hashMiddleWareInstance.encrypt(postToCreate.Password);
          let user = {
            emailID: req.body.passegnerInfo.email,
            password: "traindhaba@123",
            mobileNumber: req.body.passegnerInfo.mobileNumber,
            userType_Id: userTypeFilteredData._id.toString(),
          };
          const userResult = await UserServiceInstance.createUser(user);
          user_Id = userResult.body._id.toString();
        }
      }

      let orderStatusQuery = { OrderStatus: "ORDER_ACCEPTED" };
      let orderStatusData = await this.MongooseServiceOrderStatusInstance.find(
        orderStatusQuery
      );
      let orderStatus_Id = orderStatusData[0]._id.toString();
      let orderSourceQuery = { OrderSource: "TrainDhabaWebsite" };
      let orderSourceData = await this.MongooseServiceOrderSourceInstance.find(
        orderSourceQuery
      );
      let orderSource_Id = orderSourceData[0]._id.toString();
      const itemvalue = Number(
        req.body.MenuItems.reduce(
          (acc, item) => acc + item.quantity * item.Selling_Price,
          0
        ).toFixed(2)
      );
      const itemTax = Number(
        req.body.MenuItems.reduce(
          (acc, item) =>
            acc + (item.quantity * item.Selling_Price * item.Tax) / 100,
          0
        ).toFixed(2)
      );
      const totalAmount = Number(
        (Number(itemvalue) + Number(itemTax)).toFixed(2)
      );
      const discountAmount = 0;
      const amountPayable = Number((totalAmount - discountAmount).toFixed(0));
      //If order source Data is Null, then check with Admin
      let deliveryDate =
        Math.floor(
          dayjs(
            req.body.passegnerInfo.arrDate +
              " " +
              req.body.passegnerInfo.arrival,
            "DD-MM-YYYY hh:mm"
          ).valueOf()
        ) / 1000;
      let OrderID = "TDO" + dayjs().unix();
      const OrderObj = {
        Order_Id: OrderID,
        Irctc_Push_Status: false,
        Consumer_Id: user_Id,
        Vendor_Id: req.body.passegnerInfo.vendorId,
        Outlet_Id: req.body.passegnerInfo.outletId,
        Comment: req.body.passegnerInfo.Comment,
        Booking_Date: Math.floor(dayjs().valueOf() / 1000),
        Delivery_Date: deliveryDate,
        Item_Value: itemvalue,
        Total_Amount: totalAmount,
        Total_Margin: 0,
        GST: itemTax,
        Discount_Amount: discountAmount,
        Amount_Payable: amountPayable,
        Train_No: req.body.passegnerInfo.trainNo,
        Train_Name: req.body.passegnerInfo.trainName,
        Station_Id: req.body.passegnerInfo.stationId,
        Berth: req.body.passegnerInfo.berthNo,
        Coach: req.body.passegnerInfo.coachPosition,
        // Estimated_Arrival:req.Estimated_Arrival,
        // Estimated_Departure:req.Estimated_Departure,
        No_Of_Seats: req.body.passegnerInfo.noOfSeats,
        Payment_Mode:
          req.body.payment_Mode === 0 ? "Razor Pay" : "Cash on Delivery",
        Order_Status_Id: orderStatus_Id,
        OrderSource_Id: orderSource_Id,
        //Need to add delivery status,log table id
      };
      if (req.body.payment_Mode === 0) {
        const instance = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
          amount: amountPayable * 100, // amount in smallest currency unit
          currency: "INR",
          receipt: `receipt_order_${OrderID}`,
        };

        const order = await instance.orders.create(options);

        if (!order) return { success: false, error: "some error occured" };

        OrderObj.RazorPayOrderID = order.id;
      }
      const result = await this.MongooseServiceInstance.create(OrderObj);

      for (let eachObj in req.body.MenuItems) {
        let orderItems = {
          Order_ID: result._id,
          Item_ID: req.body.MenuItems[eachObj]._id,
          Quantity: req.body.MenuItems[eachObj].quantity,
          Amount: req.body.MenuItems[eachObj].Item_Price,
        };
        const resOrdInst = await this.MongooseServiceOrderItemsInstance.create(
          orderItems
        );
      }
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getAllOrders() {  
    try {
      // let query = { isDelete: false };
      // let populateQuery = [
      //   { path: "VendorId", select: "PANNumber MobileNumber VendorName" },
      //   { path: "Station_Id", select: "StationName" },
      //   { path: "Logo_Id", select: "filename" },
      //   { path: "NutriDocument_Id", select: "filename" }
      // ];

      let populateQuery = [
        { path: "User_Id", select: "emailID mobileNumber VendorName" },
        { path: "Order_Status_Id", select: "OrderStatus" },
        //{ path: "Outlet_id", select: "StationName" },
        //{ path: "Logo_Id", select: "filename" },
        //{ path: "NutriDocument_Id", select: "filename" }
      ];
      const result = await orderModel.find()
      .populate(populateQuery).sort({createdAt:-1}) 
        .then((result) => {
          console.log("orders result",result);
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

  async getAllOrderStatus() { 
    try {
       let query = { isDelete: false };
    
      const result = await orderStatusModel.find(query)    
        .then((result) => {
          console.log("orders result",result);
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

  

  async updateOrderStatus(req,res) { 
    try {
      let result = {};
      console.log("req",req.body);
      let query = { _id: req.body.order_Id };
      const existingOrder = await orderModel.find(query)
      .then((existingOrder) => {
        existingOrder[0].Order_Status_Id = req.body.order_Status_Id;
        console.log("existingOrder",existingOrder[0].Order_Status_Id);
         result =   this.MongooseServiceInstance.update(req.body.order_Id,existingOrder[0])    
        .then((result) => {         
          return result;
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getOrdersByVendorId(venderId) {
    try {
      // let query = { isDelete: false };
      // let populateQuery = [
      //   { path: "VendorId", select: "PANNumber MobileNumber VendorName" },
      //   { path: "Station_Id", select: "StationName" },
      //   { path: "Logo_Id", select: "filename" },
      //   { path: "NutriDocument_Id", select: "filename" }
      // ];
      let multiFitlerQuery = {
        $and: [
            {'Vendor_Id': venderId},
            {'Vendor_Id': {$ne:null}}
        ]
    }
      let query = { Vendor_Id: venderId,Vendor_Id:{$ne:null} };
      let populateQuery = [
        { path: "User_Id", select: "emailID mobileNumber VendorName" },
        //{ path: "Outlet_id", select: "StationName" },
        //{ path: "Logo_Id", select: "filename" },
        //{ path: "NutriDocument_Id", select: "filename" }
      ];
      const result = await orderModel.find(multiFitlerQuery)
      .populate(populateQuery).sort({createdAt:-1}) 
        .then((result) => {
          console.log("orders result",result);
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


  async getOrdersByDate(req) {
    try {
      const start = req.body.startdate;
      const end = req.body.enddate;
      //const start = new Date("2023-09-16");
      //start.setHours(0, 0, 0, 0);
      //const end = new Date("2023-09-26");
      //end.setHours(23, 59, 59, 999);
      const result = await orderModel.find({ 
        createdAt: {
            $gte: start, 
            $lte: end
        }})
        .then((result) => {
          console.log("orders date result",result);
          return result;
        })
        .catch((err) => {
          console.log(err);
        });
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
      }
    }

}



module.exports = OrderService;
