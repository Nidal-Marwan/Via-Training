import { LoginData, UserData } from "../../controllers/auth/User";
import { User } from "../../models/User.model";
import { AppDataSource } from "../../utils/data-source";
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      console.log("Login Successful");
      console.log("Generating accessToken");
      const token = generateAccessToken({
        email: data.email,
      });
      console.log(token);
      return { status: 200, message: "User logged in successfully", token };
    } else {
      console.error("Incorrect password");
      return { status: 409, message: "Incorrect password" };
    }
  }
};

export function generateAccessToken(user: any) {
  var token = jwt.sign(user, `${process.env.ACCESS_TOKEN_SECRET}`);
  return token;
}
