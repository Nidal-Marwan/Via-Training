import * as express from "express";
import { getLocations, postLocation, deleteLocation, putLocation } from "../../controllers/locations/location-controller";

const router = express.Router();

router.get("/:id", getLocations);
router.post("/", postLocation);
router.delete("/:id", deleteLocation);
router.put("/", putLocation);

export = router;