const express = require("express");
const router = express.Router();
const path = require("path");
const employeesController = require("../../controllers/employeesController");

// instead of using the http requests one by one on the router, we can just make use of router route and chain all the requests once and for all
router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
