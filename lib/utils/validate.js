"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payloadIncident = exports.payloadVehicle = exports.payloadCreateUser = exports.payloadEditUser = void 0;
const joi_1 = __importDefault(require("joi"));
exports.payloadEditUser = joi_1.default.object({
    name: joi_1.default.string().regex(/^[a-z ,.'-]+$/i).min(3).max(140).required(),
    email: joi_1.default.string().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i).required(),
    password: joi_1.default.string().min(6).max(140).required(),
    phone: joi_1.default.string().regex(/^[0-9]{9,15}$/).required(),
});
exports.payloadCreateUser = joi_1.default.object({
    name: joi_1.default.string().regex(/^[a-z ,.'-]+$/i).min(3).max(140).required(),
    email: joi_1.default.string().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i).required(),
    password: joi_1.default.string().min(6).max(140).required(),
    phone: joi_1.default.string().regex(/^[0-9]{9,15}$/).required(),
    driverLicense: joi_1.default.string().min(1).max(140).required(),
});
exports.payloadVehicle = joi_1.default.object({
    modelName: joi_1.default.string().min(3).max(140).required(),
    licensePlate: joi_1.default.string().min(3).max(140).required(),
    userId: joi_1.default.number().integer().required(),
});
exports.payloadIncident = joi_1.default.object({
    thirdParty: joi_1.default.object({
        name: joi_1.default.string().regex(/^[a-z ,.'-]+$/i).min(3).max(140).required(),
        email: joi_1.default.string().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i).required(),
        phone: joi_1.default.string().regex(/^[0-9]{9,15}$/).required(),
        driverLicense: joi_1.default.string().min(1).max(140).required(),
    }),
    vehicleId: joi_1.default.number().integer().required(),
    userId: joi_1.default.number().integer().required(),
    eventDate: joi_1.default.date().required(),
});
