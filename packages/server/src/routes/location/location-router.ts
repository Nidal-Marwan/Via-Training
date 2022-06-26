import * as express from "express";
import { getLocations, postLocation } from "../../controllers/locations/location-controller";

const router = express.Router();

router.get("/", getLocations);
router.post("/add", postLocation);

export = router;