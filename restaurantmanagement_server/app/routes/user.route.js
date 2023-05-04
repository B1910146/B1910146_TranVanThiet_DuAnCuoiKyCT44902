const express = require("express");
const user = require("../controllers/user.controller");

const router = express.Router();

router.route("/register")
    .post(user.register)

router.route("/login")
    .post(user.logIn)

router.route("/logout")
    .get(user.logOut)

router.route("/admin/login")
    .post(user.logInForAdmin)

router.route("/user")
    .get(user.getInfo)
    .post(user.updateInfo)

router.route("/employee")
    .get(user.findEmployee)

router.route("/employee")
    .post(user.add)

router.route("/employee/:id")
    .delete(user.deleteEmployee)

module.exports = router;