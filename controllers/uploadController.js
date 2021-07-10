const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const path = require("path");

var app = express();
var router = express.Router();

cloudinary.config({
  cloud_name: "dyng2fvrr",
  api_key: "252854336132114",
  api_secret: "inokgYUS3MiSgKPFCzLpKwiQCIw",
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `NodeServer-${file.originalname}`);
  },
});

var upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  cloudinary.uploader.upload("uploads/" + file.filename, (err, result) => {
    console.log(err, result);

    if (!err) {
      res.send({ success: true, result });
      fs.unlink(`../uploads/${file.filename}`, (err) => {
        if (err) {
          console.log(`Deleting File Error: ${err.message}`);
        }
      });
    }
  });

  res.send(file);
});

module.exports = router;
