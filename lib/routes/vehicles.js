"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRoutes = void 0;
const controllers_1 = require("../controllers");
const validate_1 = require("../utils/validate");
exports.vehicleRoutes = [
    {
        method: 'POST',
        path: '/api/vehicle',
        handler: controllers_1.Vehicles.createVehicle,
        options: {
            validate: {
                payload: validate_1.payloadVehicle,
            }
        }
    },
];
