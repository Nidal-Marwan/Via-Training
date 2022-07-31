"use strict";
var express = require("express");
var driver_controller_1 = require("../../controllers/driver/driver-controller");
var router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-var-requires
var auth = require("../../middleware/auth");
router.get("/:id", auth, driver_controller_1.getDrivers);
router.post("/", auth, driver_controller_1.postDriver);
router.delete("/:id", auth, driver_controller_1.deleteDriver);
router.put("/", auth, driver_controller_1.putDriver);
module.exports = router;
//# sourceMappingURL=driver-routes.js.map