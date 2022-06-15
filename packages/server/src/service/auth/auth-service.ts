import { UserData } from "src/controllers/auth/User";
import { User } from "../../models/User.model";
import { AppDataSource } from "../../utils/data-source";

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
