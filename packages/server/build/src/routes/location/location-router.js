"use strict";
var express = require("express");
var location_controller_1 = require("../../controllers/locations/location-controller");
var router = express.Router();
router.get("/:id", location_controller_1.getLocations);
router.post("/", location_controller_1.postLocation);
router.delete("/:id", location_controller_1.deleteLocation);
router.put("/", location_controller_1.putLocation);
module.exports = router;
//# sourceMappingURL=location-router.js.map