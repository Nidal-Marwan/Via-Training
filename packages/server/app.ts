const express = require('express');
const path = require('path');
import * as authRouter from './src/routes/auth/auth-route';
import { AppDataSource } from './src/utils/data-source';
const cors = require('cors');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
	.then(async () => {
		const app = express();
		app.use(cors({ origin: 'http://localhost:3000' }));
		app.use(express.urlencoded({ extended: true }));
		app.use(express.static(path.join(__dirname, 'public')));
		app.use(express.json());
		app.use('/api/home', authRouter);
		app.listen(PORT, () => {
			//console.log(`Server listening on ${PORT}`);
			logger.info(`Server started and running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => logger.error(error.message));
