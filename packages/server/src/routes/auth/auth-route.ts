import * as express from "express";
import { postLogin, postUser } from "../../controllers/auth/auth-controller";

const router = express.Router();

router.post("/signup", postUser);
router.post("/login", postLogin);

export = router;
