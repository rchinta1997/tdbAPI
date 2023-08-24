const mongoose = require("mongoose");

const photosFilesSchema = mongoose.Schema(
    {
        length: { type: Number },
        chunkSize: { type: Number },
        uploadDate: { type: Date },
        filename: { type: String },
        contentType: { type: String }
    }
);

module.exports = mongoose.model("photos.files", photosFilesSchema, "photos.files");