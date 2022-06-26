import { Request } from "express";
import { LoginData, UserData } from "../../controllers/auth/User";
import { User } from "../../models/User.model";
import { AppDataSource } from "../../utils/data-source";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require("jsonwebtoken");
import * as bcrypt from "bcrypt";
import logger from "../../utils/logger";

const userRepository = AppDataSource.getRepository(User);

export const addUser = async (data: UserData) => {
	const existingEmail = await userRepository.findOne({
		where: { email: data.email },
	});
	const existingPhone = await userRepository.findOne({
		where: { phone: data.phone },
	});
	if (existingEmail) {
		return { status: 409, message: "server.signup.email" };
	}
	if (existingPhone) {
		return { status: 409, message: "server.signup.phone" };
	}
	try {
		await userRepository.save(data);
		return { status: 201, message: "User added successfully" };
	} catch (err) {
		return { error: err };
	}
};

export const userLogin = async (data: LoginData) => {
	const existingEmail = await userRepository.findOne({
		where: { email: data.email },
	});

	if (!existingEmail) {
		return { status: 409, message: "server.login" };
	} else {
		const hashedPassword = existingEmail.password;
		if (await bcrypt.compare(data.password, hashedPassword)) {
			//console.log("Login Successful");
			logger.info("Login Succesful");
			//console.log("Generating accessToken");
			logger.info("Generating Access Token");
			const token = generateAccessToken({
				email: data.email,
			});
			logger.info(token);
			return { status: 200, message: "User logged in successfully", token };
		} else {
			//console.error('Incorrect password');
			logger.error("Incorrect Password");
			return { status: 409, message: "server.login" };
		}
	}
};

export function generateAccessToken(user: any) {
	const token = jwt.sign(user, `${process.env.ACCESS_TOKEN_SECRET}`);
	return token;
}

export const getMe = async (req: Request) => {
	if (req.headers && req.headers.authorization) {
		const authorization = req.headers.authorization.split(" ")[1];

		const decoded = jwt.verify(
			authorization,
			`${process.env.ACCESS_TOKEN_SECRET}`
		);
		if (decoded) {
			const user = await userRepository.findOne({
				where: { email: decoded.email },
			});
			delete user.password;
			return { status: 200, userInfo: user };
		} else {
			return { status: 401, message: "unauthorized" };
		}
	}
	return { error: "Token doesn't send with headerss" };
};