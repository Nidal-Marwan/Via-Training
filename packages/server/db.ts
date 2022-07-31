/* eslint-disable @typescript-eslint/no-var-requires */
const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DATABASE,
	port: process.env.POSTGRES_PORT,
};

const proConfig = {
	connectionString: process.env.DATABASE_URL,
    
};

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = pool;
 