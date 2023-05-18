const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};
data.empoyees = require("../../data/employees.json");

// instead of using the http requests one by one on the router, we can just make use of router route and chain all the requests once and for all
router
  .route("/")
  .get((req, res) => {
    res.json(data);
  })
  .post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .delete((req, res) => {
    res.json({ id: req.body.id });
  });

router.route("/:id").get((req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;
