"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    try {
        var token = req.headers.authorization.split(" ")[1];
        if (!token)
            return res.send({ status: 403, error: "Access denied" });
        var decoded = jwt.verify(token, "".concat(process.env.ACCESS_TOKEN_SECRET));
        if (!decoded) {
            return res.send({ status: 401, error: "Unauthorized" });
        }
        else {
            next();
        }
    }
    catch (error) {
        res.send({ status: 400, error: "Invalid token" });
    }
};
//# sourceMappingURL=auth.js.map