import * as express from "express";
import { getDrivers, postDriver, deleteDriver, putDriver } from "../../controllers/driver/driver-controller";

const router = express.Router();

router.get("/:id", getDrivers);
router.post("/", postDriver);
router.delete("/:id", deleteDriver);
router.put("/", putDriver);

export = router;