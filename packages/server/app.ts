/* eslint-disable @typescript-eslint/no-var-requires */
// import * as express from "express";
const express = require("express");
const path = require("path");
// import * as path from "path";
const authRouter = require("./src/routes/auth/auth-route");
const locationRouter = require("./src/routes/location/location-router");
const driversRouter = require("./src/routes/drivers/driver-routes");
const AppDataSource = require("./src/utils/data-source");
const cors = require("cors");
const logger = require("./src/utils/logger");

// import * as authRouter from "./src/routes/auth/auth-route";
// import * as locationRouter from "./src/routes/location/location-router";
// import * as driversRouter from "./src/routes/drivers/driver-routes";
// import { AppDataSource } from "./src/utils/data-source";
// import * as cors from "cors";
// import logger from "./src/utils/logger";


const PORT = process.env.PORT || 3001;
AppDataSource.initialize()
	.then(async () => {
		const app = express();
		app.use(cors({ origin: "http://localhost:3000" }));
		app.use(express.urlencoded({ extended: true }));
		app.use(express.static(path.join(__dirname, "public")));
		app.use(express.json());
		app.use("/api/home", authRouter);
		app.use("/api/locations", locationRouter);
		app.use("/api/drivers", driversRouter);

		app.listen(PORT, () => {
			logger.info(`Server started and running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => logger.error(error.message));
