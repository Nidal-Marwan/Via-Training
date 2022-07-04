import * as express from "express";
import { getDrivers, postDriver, deleteDriver, putDriver } from "../../controllers/driver/driver-controller";


const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const auth = require("../../middleware/auth");

router.get("/:id", auth, getDrivers);
router.post("/", auth, postDriver);
router.delete("/:id", auth, deleteDriver);
router.put("/", auth, putDriver);

export = router;