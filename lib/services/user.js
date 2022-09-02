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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUser = exports.getUser = exports.createUserObect = void 0;
const __1 = require("..");
const entity_1 = require("../entity");
const createUserObect = () => new entity_1.Users();
exports.createUserObect = createUserObect;
const getUser = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = __1.AppDataSource.getRepository(entity_1.Users);
    const user = yield userRepository.findOneBy({
        [key]: value
    });
    return user;
});
exports.getUser = getUser;
const saveUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = __1.AppDataSource.getRepository(entity_1.Users);
    const savedUser = yield userRepository.save(user);
    return savedUser;
});
exports.saveUser = saveUser;
