const express = require("express");
const { mongoose } = require("./db.js");
var cors = require("cors");

const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

var employeeController = require("./controllers/employeeController");
var uploadController = require("./controllers/uploadController");

var app = express();
var port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

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

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.post("/file", upload.single("file"), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  cloudinary.uploader.upload("uploads/" + file.filename, (err, result) => {
    if (!err) {
      res.send({ success: true, result });
      fs.unlink(`uploads/${file.filename}`, (err) => {
        if (err) {
          console.log(`Deleting File Error: ${err.message}`);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log("Connected to Node Server on port #: " + port);
});

// Routes
app.use("/employees", employeeController);
app.use("/uploads", uploadController);
