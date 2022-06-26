import * as express from "express";
import {
	getMe,
	postLogin,
	postUser,
} from "../../controllers/auth/auth-controller";

const router = express.Router();

router.post("/signup", postUser);
router.post("/login", postLogin);
router.get("/user", getMe);

export = router;
