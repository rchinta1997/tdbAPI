const express = require("express");
const cors = require("cors");
require("dotenv").config();
// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const axios=require("axios");
const bodyParser = require('body-parser');
const fs = require('fs');
mongoose.Promise = global.Promise;
const multer = require("multer");
const {
  GridFsStorage
} = require("multer-gridfs-storage");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

// Connecting to the database
try {
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    dbName: dbConfig.database,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
} catch (error) {
  handleError(error);
}

  process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
  });
const app = express();
const port = process.env.PORT || 8080;
// const whitelist = ["http://localhost:3000", "http://localhost:3001"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
app.use(cors());
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: "50mb" }))

//app.use(express.urlencoded({ extended: true }));
axios.interceptors.request.use(
  (req) => {
    const token = process.env.REACT_APP_IRCTC_AUTH_TOKEN;
    req.headers.Authorization = token;
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TrainDhaba API." });
});
app.use(async (req) => {
  try {
    if (req.url != "/user/authenticate") {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (token == null) return res.sendStatus(401);

      jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
          return res.sendStatus(401);
        }
        req.user = user;

        return req.next();
      });
    } else {
      return req.next();
    }
  } catch (e) {
    return req.next();
  }
});

//creating bucket
let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: dbConfig.imgBucket
  });
  console.log(bucket);
});


// set port, listen for requests
require("./app/route.config.js")(app);
app.use(express.static('uploads'));
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument, {customCss}));
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
