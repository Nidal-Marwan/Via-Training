const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp}) => {
	return `${timestamp} ${level}: ${message}`;
});

module.exports = createLogger({
	format: combine(format.colorize(), splat(), timestamp(), myFormat),
	transports: [
		new transports.File({
			filename: 'logs/server.log',
		}),
		new transports.Console({ level: 'info' }),
	],
});
