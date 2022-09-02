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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVehicle = void 0;
const user_1 = require("../services/user");
const vehicles_1 = require("../services/vehicles");
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { modelName, licensePlate, userId, } = req.payload;
    let user = yield (0, user_1.getUser)('id', userId);
    if (!user || !user.id) {
        return res.response({
            status: 'User not found',
        }).code(404);
    }
    const vehicle = (0, vehicles_1.createVehicleObject)({ modelName, licensePlate, user });
    const _a = yield (0, vehicles_1.saveVehicle)(vehicle), _b = _a.user, { password: _password } = _b, restUser = __rest(_b, ["password"]), data = __rest(_a, ["user"]);
    return res.response({
        status: 'Created',
        data: Object.assign(Object.assign({}, data), { user: restUser }),
    }).code(201);
});
exports.createVehicle = createVehicle;
