"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.generateAccessToken = exports.userLogin = exports.addUser = void 0;
var User_model_1 = require("../../models/User.model");
var data_source_1 = require("../../utils/data-source");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var logger_1 = require("../../utils/logger");
var userRepository = data_source_1.AppDataSource.getRepository(User_model_1.User);
var addUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var existingEmail, existingPhone, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userRepository.findOne({
                    where: { email: data.email },
                })];
            case 1:
                existingEmail = _a.sent();
                return [4 /*yield*/, userRepository.findOne({
                        where: { phone: data.phone },
                    })];
            case 2:
                existingPhone = _a.sent();
                if (existingEmail) {
                    return [2 /*return*/, { status: 409, message: "server.signup.email" }];
                }
                if (existingPhone) {
                    return [2 /*return*/, { status: 409, message: "server.signup.phone" }];
                }
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, userRepository.save(data)];
            case 4:
                _a.sent();
                return [2 /*return*/, { status: 201, message: "User added successfully" }];
            case 5:
                err_1 = _a.sent();
                return [2 /*return*/, { error: err_1 }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addUser = addUser;
var userLogin = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var existingEmail, hashedPassword, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userRepository.findOne({
                    where: { email: data.email },
                })];
            case 1:
                existingEmail = _a.sent();
                if (!!existingEmail) return [3 /*break*/, 2];
                return [2 /*return*/, { status: 409, message: "server.login" }];
            case 2:
                hashedPassword = existingEmail.password;
                return [4 /*yield*/, bcrypt.compare(data.password, hashedPassword)];
            case 3:
                if (_a.sent()) {
                    logger_1.default.info("Login Succesful");
                    logger_1.default.info("Generating Access Token");
                    token = generateAccessToken({
                        email: data.email,
                    });
                    logger_1.default.info(token);
                    return [2 /*return*/, { status: 200, message: "User logged in successfully", token: token }];
                }
                else {
                    //console.error('Incorrect password');
                    logger_1.default.error("Incorrect Password");
                    return [2 /*return*/, { status: 409, message: "server.login" }];
                }
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.userLogin = userLogin;
function generateAccessToken(user) {
    var token = jwt.sign(user, "".concat(process.env.ACCESS_TOKEN_SECRET));
    return token;
}
exports.generateAccessToken = generateAccessToken;
var getMe = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var authorization, decoded, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.headers && req.headers.authorization)) return [3 /*break*/, 3];
                authorization = req.headers.authorization.split(" ")[1];
                decoded = jwt.verify(authorization, "".concat(process.env.ACCESS_TOKEN_SECRET));
                if (!decoded) return [3 /*break*/, 2];
                return [4 /*yield*/, userRepository.findOne({
                        where: { email: decoded.email },
                    })];
            case 1:
                user = _a.sent();
                delete user.password;
                return [2 /*return*/, { status: 200, userInfo: user }];
            case 2: return [2 /*return*/, { status: 401, message: "unauthorized" }];
            case 3: return [2 /*return*/, { error: "Token not sent with headers" }];
        }
    });
}); };
exports.getMe = getMe;
//# sourceMappingURL=auth-service.js.map