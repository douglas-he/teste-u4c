"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incidentsRoutes = void 0;
const controllers_1 = require("../controllers");
const validate_1 = require("../utils/validate");
exports.incidentsRoutes = [
    {
        method: "POST",
        path: "/api/incident",
        handler: controllers_1.Incidents.createIncident,
        options: {
            validate: {
                payload: validate_1.payloadIncident
            }
        }
    },
];
