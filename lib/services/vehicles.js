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
exports.getVehicle = exports.saveVehicle = exports.createVehicleObject = void 0;
const __1 = require("..");
const entity_1 = require("../entity");
const createVehicleObject = (_a) => {
    var params = __rest(_a, []);
    let vehicle = new entity_1.Vehicles();
    vehicle = Object.assign(Object.assign({}, vehicle), params);
    return vehicle;
};
exports.createVehicleObject = createVehicleObject;
const saveVehicle = (vehicle) => __awaiter(void 0, void 0, void 0, function* () {
    const vehiclesRepository = __1.AppDataSource.getRepository(entity_1.Vehicles);
    return vehiclesRepository.save(vehicle);
});
exports.saveVehicle = saveVehicle;
const getVehicle = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = __1.AppDataSource.getRepository(entity_1.Vehicles);
    const vehicle = yield userRepository.findOneBy({
        [key]: value
    });
    return vehicle;
});
exports.getVehicle = getVehicle;
