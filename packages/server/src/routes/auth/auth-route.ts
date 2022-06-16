import express from "express";
import { postUser } from "../../controllers/auth/auth-controller";

const router = express.Router();

router.post("/signup", postUser);

export = router;
