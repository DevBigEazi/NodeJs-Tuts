const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const verfifyRoles = require("../../middleware/verifyRoles");
const ROLE_LIST = require("../../config/roles_list");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(
    verfifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verfifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(verfifyRoles(ROLE_LIST.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
