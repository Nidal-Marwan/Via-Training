import { LoginData, UserData } from "../../controllers/auth/User";
import { User } from "../../models/User.model";
import { AppDataSource } from "../../utils/data-source";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require("../../utils/logger");

const userRepository = AppDataSource.getRepository(User);

export const addUser = async (data: UserData) => {
	const existingEmail = await userRepository.findOne({
		where: { email: data.email },
	});
	const existingPhone = await userRepository.findOne({
		where: { phone: data.phone },
	});
	if (existingEmail) {
		return { status: 409, message: "Email already exist" };
	}
	if (existingPhone) {
		return { status: 409, message: "Phone already exist" };
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
		return { status: 409, message: "Email does not exist" };
	} else {
		const hashedPassword = existingEmail.password;
		if (await bcrypt.compare(data.password, hashedPassword)) {
			logger.info("Login Succesful");
			logger.info("Generating Access Token");
			const token = generateAccessToken({
				email: data.email,
			});
			logger.info(token);
			return { status: 200, message: "User logged in successfully", token };
		} else {
			logger.error("Incorrect Password");
			return { status: 409, message: "Incorrect password" };
		}
	}
};

export function generateAccessToken(user: any) {
	const token = jwt.sign(user, `${process.env.ACCESS_TOKEN_SECRET}`);
	return token;
}
