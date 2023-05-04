const express = require("express");
const dish = require("../controllers/dish.controller");

const router = express.Router();

router.route("/dish")
    .get(dish.findAll)
    .post(dish.create)
    .delete(dish.deleteAll);

router.route("/:id")
    .get(dish.findOne)
    .post(dish.update)
    .delete(dish.delete);

module.exports = router;