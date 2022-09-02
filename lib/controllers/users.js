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
exports.editUser = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../services/user");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone, driverLicense, } = req.payload;
    let user = (yield (0, user_1.getUser)('driverLicense', driverLicense)) || (0, user_1.createUserObect)();
    const statusCode = user.id ? 204 : 201;
    user = Object.assign(Object.assign({}, user), { name,
        email, password: jsonwebtoken_1.default.sign({ password }, process.env.SECRET), isClient: true, driverLicense: driverLicense, phone });
    const _a = yield (0, user_1.saveUser)(user), { password: _password } = _a, data = __rest(_a, ["password"]);
    return res.response({
        status: 'Created',
        data,
    }).code(statusCode);
});
exports.createUser = createUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone, } = req.payload;
    let userToupdate = yield (0, user_1.getUser)('id', req.params.id);
    if (userToupdate && userToupdate.id) {
        userToupdate = Object.assign(Object.assign({}, userToupdate), { name,
            email, password: jsonwebtoken_1.default.sign({ password }, process.env.SECRET), phone });
        yield (0, user_1.saveUser)(userToupdate);
    }
    return res.response().code(204);
});
exports.editUser = editUser;
