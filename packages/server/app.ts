import * as express from "express";
import * as path from "path";
import * as authRouter from "./src/routes/auth/auth-route";
import { AppDataSource } from "./src/utils/data-source";
import * as cors from "cors";
import logger from "./src/utils/logger";


const PORT = 3002; 
AppDataSource.initialize()
	.then(async () => {
		const app = express();
		app.use(cors({ origin: "http://localhost:3000" }));
		app.use(express.urlencoded({ extended: true }));
		app.use(express.static(path.join(__dirname, "public")));
		app.use(express.json());
		app.use("/api/home", authRouter);
		app.listen(PORT, () => {
			logger.info(`Server started and running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => logger.error(error.message));
