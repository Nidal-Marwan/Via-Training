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
exports.putDriver = exports.deleteDriver = exports.postDriver = exports.getDrivers = void 0;
var service = require("../../service/driver/driver-service");
var getDrivers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                if (!!userId) return [3 /*break*/, 1];
                return [2 /*return*/, res.send({ error: "Invalid input" })];
            case 1: return [4 /*yield*/, service.getUserDrivers(req, userId)];
            case 2:
                response = _a.sent();
                return [2 /*return*/, res.send(response)];
        }
    });
}); };
exports.getDrivers = getDrivers;
var postDriver = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, phone, carModel, licensePlate, locationId, userId, error, data, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, phone = _a.phone, carModel = _a.carModel, licensePlate = _a.licensePlate, locationId = _a.locationId, userId = _a.userId;
                error = {};
                if (!name) {
                    error["nameError"] = "Name is required";
                }
                if (!phone) {
                    error["phoneError"] = "phone is required";
                }
                if (!carModel) {
                    error["carModelError"] = "Car-Model is required";
                }
                if (!licensePlate) {
                    error["licenseError"] = "License-Plate is required";
                }
                if (!userId) {
                    error["userIdError"] = "UserId is required";
                }
                if (Object.keys(error).length != 0) {
                    return [2 /*return*/, res.send({ status: 400, error: error })];
                }
                data = {
                    name: name,
                    phone: phone,
                    carModel: carModel,
                    licensePlate: licensePlate,
                    locationId: locationId,
                    userId: userId
                };
                return [4 /*yield*/, service.addDriver(req, data)];
            case 1:
                response = _b.sent();
                return [2 /*return*/, res.send(response)];
        }
    });
}); };
exports.postDriver = postDriver;
var deleteDriver = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                if (!userId) {
                    return [2 /*return*/, res.send({ error: "Invalid input" })];
                }
                return [4 /*yield*/, service.deleteDriver(req, parseInt(userId))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, res.send(response)];
        }
    });
}); };
exports.deleteDriver = deleteDriver;
var putDriver = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, lat, lng, phone, carModel, licensePlate, date, locationName, locationId, userId, error, data, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, lat = _a.lat, lng = _a.lng, phone = _a.phone, carModel = _a.carModel, licensePlate = _a.licensePlate, date = _a.date, locationName = _a.locationName, locationId = _a.locationId, userId = _a.userId;
                error = {};
                if (!name) {
                    error["nameError"] = "Name is required";
                }
                if (!phone) {
                    error["phoneError"] = "phone is required";
                }
                if (!carModel) {
                    error["carModelError"] = "Car-Model is required";
                }
                if (!licensePlate) {
                    error["licenseError"] = "License-Plate is required";
                }
                if (!userId) {
                    error["userIdError"] = "UserId is required";
                }
                if (Object.keys(error).length != 0) {
                    return [2 /*return*/, res.send({ status: 400, error: error })];
                }
                data = {
                    name: name,
                    lat: lat,
                    lng: lng,
                    phone: phone,
                    carModel: carModel,
                    licensePlate: licensePlate,
                    date: date,
                    locationName: locationName,
                    locationId: locationId,
                    userId: userId
                };
                return [4 /*yield*/, service.editDriver(req, data)];
            case 1:
                response = _b.sent();
                return [2 /*return*/, res.send(response)];
        }
    });
}); };
exports.putDriver = putDriver;
//# sourceMappingURL=driver-controller.js.map