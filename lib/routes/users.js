"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const controllers_1 = require("../controllers");
const validate_1 = require("../utils/validate");
exports.userRoutes = [
    {
        method: "POST",
        path: "/api/user",
        handler: controllers_1.User.createUser,
        options: {
            validate: {
                payload: validate_1.payloadCreateUser,
            }
        }
    },
    {
        method: "PATCH",
        path: "/api/user/{id}",
        handler: controllers_1.User.editUser,
        options: {
            validate: {
                payload: validate_1.payloadEditUser,
            }
        }
    }
];
