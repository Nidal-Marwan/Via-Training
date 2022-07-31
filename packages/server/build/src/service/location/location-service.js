"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.editLocation = exports.deleteLocation = exports.addLocation = exports.fetchUserLocations = void 0;
var Location_model_1 = require("../../models/Location.model");
var data_source_1 = require("../../utils/data-source");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var jwt = require("jsonwebtoken");
var locationRepository = data_source_1.AppDataSource.getRepository(Location_model_1.Location);
var fetchUserLocations = function (req, data) { return __awaiter(void 0, void 0, void 0, function () {
    var authorization, decoded, currentUserLocations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.headers && req.headers.authorization)) return [3 /*break*/, 3];
                authorization = req.headers.authorization.split(" ")[1];
                decoded = jwt.verify(authorization, "".concat(process.env.ACCESS_TOKEN_SECRET));
                if (!decoded) return [3 /*break*/, 2];
                return [4 /*yield*/, locationRepository.find({
                        where: { userId: parseInt(data.userId) },
                    })];
            case 1:
                currentUserLocations = _a.sent();
                if (currentUserLocations.length === 0) {
                    return [2 /*return*/, { status: 204, message: "No favorite locations for user" }];
                }
                return [2 /*return*/, { status: 200, message: "Locations fetched", data: currentUserLocations }];
            case 2: return [2 /*return*/, { status: 401, message: "unauthorized" }];
            case 3: return [2 /*return*/, { error: "Token not sent with headers" }];
        }
    });
}); };
exports.fetchUserLocations = fetchUserLocations;
var addLocation = function (req, data) { return __awaiter(void 0, void 0, void 0, function () {
    var authorization, decoded, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.headers && req.headers.authorization)) return [3 /*break*/, 6];
                authorization = req.headers.authorization.split(" ")[1];
                decoded = jwt.verify(authorization, "".concat(process.env.ACCESS_TOKEN_SECRET));
                if (!decoded) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, locationRepository.save(data)];
            case 2:
                _a.sent();
                return [2 /*return*/, { status: 200, message: "Location added successfully" }];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, { error: err_1 }];
            case 4: return [3 /*break*/, 6];
            case 5: return [2 /*return*/, { status: 401, message: "unauthorized" }];
            case 6: return [2 /*return*/, { error: "Token not sent with headers" }];
        }
    });
}); };
exports.addLocation = addLocation;
var deleteLocation = function (req, data) { return __awaiter(void 0, void 0, void 0, function () {
    var authorization, decoded, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.headers && req.headers.authorization)) return [3 /*break*/, 4];
                authorization = req.headers.authorization.split(" ")[1];
                decoded = jwt.verify(authorization, "".concat(process.env.ACCESS_TOKEN_SECRET));
                if (!decoded) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, locationRepository.delete(parseInt(data))];
            case 2:
                _a.sent();
                return [2 /*return*/, { status: 200, message: "Location deleted successfully" }];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, { error: err_2 }];
            case 4: return [2 /*return*/, { error: "Token not sent with headers" }];
        }
    });
}); };
exports.deleteLocation = deleteLocation;
var editLocation = function (req, data) { return __awaiter(void 0, void 0, void 0, function () {
    var authorization, decoded, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.headers && req.headers.authorization)) return [3 /*break*/, 4];
                authorization = req.headers.authorization.split(" ")[1];
                decoded = jwt.verify(authorization, "".concat(process.env.ACCESS_TOKEN_SECRET));
                if (!decoded) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, locationRepository.save(__assign({}, data))];
            case 2:
                _a.sent();
                return [2 /*return*/, { status: 200, message: "Location edited successfully" }];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, { error: err_3 }];
            case 4: return [2 /*return*/, { error: "Token not sent with headers" }];
        }
    });
}); };
exports.editLocation = editLocation;
//# sourceMappingURL=location-service.js.map