import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

module.exports = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) return res.send({ status: 403, error: "Access denied" });
		const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
		if (!decoded) {
			return res.send({ status: 401, error: "Unauthorized" });
		}
		else {
			next();
		}
	} catch (error) {
		res.send({ status: 400, error: "Invalid token" });
	}
};