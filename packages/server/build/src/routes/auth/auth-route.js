"use strict";
var express = require("express");
var auth_controller_1 = require("../../controllers/auth/auth-controller");
var router = express.Router();
router.post("/signup", auth_controller_1.postUser);
router.post("/login", auth_controller_1.postLogin);
router.get("/user", auth_controller_1.getMe);
module.exports = router;
//# sourceMappingURL=auth-route.js.map