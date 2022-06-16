import { Request, Response } from "express";
import * as service from "../../service/auth/auth-service";
const bcrypt = require("bcrypt");

export const postUser = async (req: Request, res: Response) => {
  const userName: string = req.body.name;
  const email: string = req.body.email;
  const phone: string = req.body.phone;
  const password: string = req.body.password;
  if (!userName || !email || !phone || !password) {
    return res.send({ error: "Invalid input" });
  }
  const hashPassword: string = await bcrypt.hash(req.body.password, 10);
  const data = {
    username: <string>req.body.name,
    email: <string>req.body.email,
    phone: <string>req.body.phone,
    password: hashPassword,
  };
  const response = await service.addUser(data);
  return res.send(response);
};
