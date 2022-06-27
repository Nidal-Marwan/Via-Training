import * as express from "express";
import { getLocations, postLocation, deleteLocation, putLocation } from "../../controllers/locations/location-controller";

const router = express.Router();

router.post("/", getLocations);
router.post("/add", postLocation);
router.post("/delete", deleteLocation);
router.put("/edit", putLocation);

export = router;