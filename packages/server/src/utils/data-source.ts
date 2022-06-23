import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	host: process.env.POSTGRES_HOST,
	port: parseInt(<string>process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
	type: "postgres",
	logging: false,
	synchronize: true,
	entities: [__dirname + "/../**/*.model.ts"],
});
