const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
const dbConfig = require("../../config/database.config");
const mongoose = require('mongoose');
const promise = mongoose.connect(dbConfig.url);

const conn = mongoose.connection;

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn, {
        bucketName: dbConfig.imgBucket
    });
    //dbConfig.imgBucket);
    //gfs.collection(dbConfig.imgBucket);
});

var storage = new GridFsStorage({
    db: promise,
    file: (req, file) => {
        //const match = ["image/png", "image/jpeg"];

        // if (match.indexOf(file.mimetype) === -1) {
        //     const filename = `${Date.now()}-TDV-${file.originalname}`;
        //     return {bucketName: dbConfig.imgBucket,filename: `${Date.now()}-TDV-${file.originalname}`};
        // }

        return {
            bucketName: dbConfig.imgBucket,
            filename: `${Date.now()}-TDV-${file.originalname}`
        };
    }
});

var uploadFiles = multer({ storage: storage }).array("file", 10);
// var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;