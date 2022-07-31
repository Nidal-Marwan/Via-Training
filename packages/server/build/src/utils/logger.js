"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var combine = winston_1.format.combine, splat = winston_1.format.splat, timestamp = winston_1.format.timestamp, printf = winston_1.format.printf;
var myFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, timestamp = _a.timestamp;
    return "".concat(timestamp, " ").concat(level, ": ").concat(message);
});
var logger = (0, winston_1.createLogger)({
    format: combine(winston_1.format.colorize(), splat(), timestamp(), myFormat),
    transports: [
        new winston_1.transports.File({
            filename: "logs/server.log",
        }),
        new winston_1.transports.Console({ level: "info" }),
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map