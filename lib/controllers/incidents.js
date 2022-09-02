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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIncident = void 0;
const generate_password_1 = __importDefault(require("generate-password"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../services/user");
const incident_1 = require("../services/incident");
const vehicles_1 = require("../services/vehicles");
const createIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thirdParty: { name, email, driverLicense, phone }, vehicleId, userId, eventDate, } = req.payload;
    const userThird = yield (0, user_1.getUser)('driverLicense', driverLicense);
    let incident = (0, incident_1.createIncidentObject)();
    if (userThird && Number(userThird.id) === Number(userId)) {
        return res.response({
            status: 'The user cannot register an incident with himself',
        }).code(409);
    }
    if (userThird && userThird.id) {
        incident.thirdParty = userThird;
    }
    else {
        let userThird = (0, user_1.createUserObect)();
        const password = generate_password_1.default.generate({
            length: 15,
            numbers: true,
        });
        userThird = Object.assign(Object.assign({}, userThird), { name,
            email, password: jsonwebtoken_1.default.sign({ password }, process.env.SECRET), isClient: false, driverLicense: driverLicense, phone });
        const data = yield (0, user_1.saveUser)(userThird);
        incident.thirdParty = data;
    }
    const vehicle = yield (0, vehicles_1.getVehicle)('id', vehicleId);
    if (!vehicle || !vehicle.id) {
        return res.response({
            status: 'Vehicle not found',
        }).code(404);
    }
    const userRegister = yield (0, user_1.getUser)('id', userId);
    if (!userRegister || !userRegister.id) {
        return res.response({
            status: 'User not found',
        }).code(404);
    }
    incident = Object.assign(Object.assign({}, incident), { vehicle, user: userRegister, eventDate });
    const _a = yield (0, incident_1.saveIncident)(incident), _b = _a.user, { password: _password } = _b, restUser = __rest(_b, ["password"]), _c = _a.thirdParty, { password: _unusedPassword } = _c, restThidParty = __rest(_c, ["password"]), data = __rest(_a, ["user", "thirdParty"]);
    return res
        .response({
        status: 'Created',
        data: Object.assign(Object.assign({}, data), { user: restUser, thirdParty: restThidParty }),
    })
        .code(201);
});
exports.createIncident = createIncident;
