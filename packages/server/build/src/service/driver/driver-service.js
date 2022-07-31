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
exports.editDriver = exports.deleteDriver = exports.addDriver = exports.getUserDrivers = void 0;
var Driver_model_1 = require("../../models/Driver.model");
var Location_model_1 = require("../../models/Location.model");
var data_source_1 = require("../../utils/data-source");
var driverRepository = data_source_1.AppDataSource.getRepository(Driver_model_1.Driver);
var locationRepo = data_source_1.AppDataSource.getRepository(Location_model_1.Location);
var getUserDrivers = function (req, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUserDrivers, locations, data, driversWithLocations, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, driverRepository.find({
                        where: { userId: +userId },
                    })];
            case 1:
                currentUserDrivers = _a.sent();
                if (!(currentUserDrivers.length === 0)) return [3 /*break*/, 2];
                return [2 /*return*/, { status: 204, message: "No drivers for user" }];
            case 2:
                locations = currentUserDrivers.map(function (driver) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, locationRepo.find({ where: { id: driver.locationId } })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(locations)];
            case 3:
                data = _a.sent();
                driversWithLocations = { driversInfo: currentUserDrivers, locationsInfo: data };
                return [2 /*return*/, { status: 200, message: "Drivers fetched", drivers: driversWithLocations }];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                return [2 /*return*/, { status: 400, error: "invalid request" }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getUserDrivers = getUserDrivers;
var addDriver = function (req, data) { return __awaiter(void 0, void 0, void 0, function () {
    var existingDriver, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, driverRepository.findOne({ where: { phone: data.phone } })];
            case 1:
                existingDriver = _a.sent();
                if (existingDriver) {
                    return [2 /*return*/, { status: 409, message: "Phone already exist" }];
                }
                return [4 /*yield*/, driverRepository.save(data)];
            case 2:
                _a.sent();
                return [2 /*return*/, { status: 200, message: "Driver added successfully" }];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, { error: err_2 }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addDriver = addDriver;
var deleteDriver = function (req, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, driverRepository.delete(userId)];
            case 1:
                _a.sent();
                return [2 /*return*/, { status: 200, message: "Driver deleted successfully" }];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, { error: err_3 }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteDriver = deleteDriver;
var editDriver = function (req, data) { return __awaiter(void 0, void 0, void 0, function () {
    var editedDriver, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, driverRepository.findOne({ where: { phone: req.body.phone } })];
            case 1:
                editedDriver = _a.sent();
                if (!editedDriver) return [3 /*break*/, 3];
                return [4 /*yield*/, driverRepository.update(editedDriver.id, data)];
            case 2:
                _a.sent();
                return [2 /*return*/, { status: 200, message: "Driver edited successfully" }];
            case 3: return [2 /*return*/, { status: 200, message: "Driver not found" }];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                return [2 /*return*/, { error: err_4 }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.editDriver = editDriver;
//# sourceMappingURL=driver-service.js.map