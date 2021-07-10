const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { Employee } = require("../models/employee");

//Get Method
router.get("/", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in fetching Employees", JSON.stringify(err));
    }
  });
});

//Get By ID Method
router.get("/:id", (req, res) => {
  Employee.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in fetching Employees", JSON.stringify(err));
    }
  });
});

//Duplicate Check With ID
router.get("/duplicateWithId/:id/:value", (req, res) => {
  Employee.countDocuments(
    { _id: { $eq: req.params.id }, employeeName: { $eq: req.params.value } },
    function (err, docs) {
      if (!err) {
        let body = {
          recordCount: docs,
        };

        res.status(200).send(body);
      } else {
        console.log("Error in fetching Employees", JSON.stringify(err));
      }
    }
  );
});
//Duplicate Check Without ID
router.get("/duplicateWithoutId/:value", (req, res) => {
  Employee.countDocuments(
    { employeeName: { $eq: req.params.value } },
    function (err, docs) {
      if (!err) {
        let body = {
          recordCount: docs,
        };

        res.status(200).send(body);
      } else {
        console.log("Error in fetching Employees", JSON.stringify(err));
      }
    }
  );
});

//Post method
router.post("/", (req, res) => {
  console.log(req.body, req.params);
  const employee = new Employee({
    employeeId: req.body.employeeId,
    employeeName: req.body.employeeName,
    joiningDate: req.body.joiningDate,
  });

  employee.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error while saving record",
        JSON.stringify(err, undefined, 2)
      );
    }
  });
});

//Put method
router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(404)
      .send(`No record found with given id ${req.params.id}`);

  console.log(req.body);
  const employee = new Employee({
    employeeId: req.body.employeeId,
    employeeName: req.body.employeeName,
    joiningDate: req.body.joiningDate,
  });

  Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in Employee update" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

module.exports = router;
